import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { promises as fs } from "fs";
import path from "path";

const allowedRoles = [
  "CUSTOMER",
  "PROPERTY_OWNER",
  "REALTOR",
] as const;

const allowedDocumentTypes = [
  "NIN",
  "DRIVERS_LICENSE",
  "INTERNATIONAL_PASSPORT",
  "VOTERS_CARD",
  "CAC_DOCUMENT",
] as const;

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "application/pdf",
];

const REFERRAL_REWARD_POINTS = 1000;

type TransactionClient = Pick<typeof prisma, "user">;

function generateReferralCode() {
  const characters =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let code = "STC";

  for (let i = 0; i < 5; i++) {
    code += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return code;
}

async function generateUniqueReferralCode(
  tx: TransactionClient
) {
  for (let attempt = 0; attempt < 20; attempt++) {
    const code = generateReferralCode();

    const existing = await tx.user.findFirst({
      where: {
        referralCode: code,
      },
      select: {
        id: true,
      },
    });

    if (!existing) {
      return code;
    }
  }

  throw new Error(
    "Unable to generate a unique referral code."
  );
}

async function generateUniqueStcUserNumber(
  tx: TransactionClient
) {
  const users = await tx.user.findMany({
    where: {
      stcUserNumber: {
        not: null,
      },
    },
    select: {
      stcUserNumber: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  let highestNumber = 0;

  for (const user of users) {
    if (!user.stcUserNumber) continue;

    const match =
      user.stcUserNumber.match(/^STC-(\d+)$/);

    if (match) {
      const number = Number(match[1]);

      if (
        Number.isFinite(number) &&
        number > highestNumber
      ) {
        highestNumber = number;
      }
    }
  }

  for (let attempt = 1; attempt <= 20; attempt++) {
    const candidate =
      `STC-${String(
        highestNumber + attempt
      ).padStart(6, "0")}`;

    const existing = await tx.user.findFirst({
      where: {
        stcUserNumber: candidate,
      },
      select: {
        id: true,
      },
    });

    if (!existing) {
      return candidate;
    }
  }

  throw new Error(
    "Unable to generate a unique STC User Number."
  );
}

export async function POST(
  request: NextRequest
) {
  let savedFilePath: string | null = null;

  try {
    const formData = await request.formData();

    const firstName = String(
      formData.get("firstName") || ""
    ).trim();

    const lastName = String(
      formData.get("lastName") || ""
    ).trim();

    const email = String(
      formData.get("email") || ""
    )
      .trim()
      .toLowerCase();

    const phone = String(
      formData.get("phone") || ""
    ).trim();

    const password = String(
      formData.get("password") || ""
    );

    const accountType = String(
      formData.get("accountType") || ""
    );

    const documentType = String(
      formData.get("documentType") || ""
    );

    const documentNumber = String(
      formData.get("documentNumber") || ""
    ).trim();

    const referralCodeInput = String(
      formData.get("referralCode") || ""
    )
      .trim()
      .toUpperCase();

    const documentFile = formData.get(
      "documentFile"
    );

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !accountType ||
      !documentType ||
      !(documentFile instanceof File)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "All registration fields, including identity verification, are required.",
        },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Password must be at least 8 characters long.",
        },
        { status: 400 }
      );
    }

    if (
      !allowedRoles.includes(
        accountType as (typeof allowedRoles)[number]
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid account type.",
        },
        { status: 400 }
      );
    }

    if (
      !allowedDocumentTypes.includes(
        documentType as (typeof allowedDocumentTypes)[number]
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid identity document type.",
        },
        { status: 400 }
      );
    }

    if (documentFile.size === 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "The selected identity document is empty.",
        },
        { status: 400 }
      );
    }

    if (documentFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Identity document must not exceed 5MB.",
        },
        { status: 400 }
      );
    }

    if (
      !allowedMimeTypes.includes(
        documentFile.type
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Identity document must be JPG, PNG or PDF.",
        },
        { status: 400 }
      );
    }

    const existingEmail =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists.",
        },
        { status: 409 }
      );
    }

    const existingPhone =
      await prisma.user.findUnique({
        where: {
          phone,
        },
      });

    if (existingPhone) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Phone number already exists.",
        },
        { status: 409 }
      );
    }

    /*
     * Validate referral code before saving
     * the identity document.
     */
    let referrerId: string | null = null;

    if (referralCodeInput) {
      const referrer =
        await prisma.user.findFirst({
          where: {
            referralCode:
              referralCodeInput,
          },
          select: {
            id: true,
            status: true,
          },
        });

      if (!referrer) {
        return NextResponse.json(
          {
            success: false,
            message:
              "The referral code entered is invalid.",
          },
          { status: 400 }
        );
      }

      if (
        referrer.status === "BLOCKED" ||
        referrer.status === "SUSPENDED"
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "This referral code is no longer active.",
          },
          { status: 400 }
        );
      }

      referrerId = referrer.id;
    }

    /*
     * Save identity document
     */

    const uploadDirectory =
      path.join(
        process.cwd(),
        "public",
        "uploads",
        "identity"
      );

    await fs.mkdir(
      uploadDirectory,
      {
        recursive: true,
      }
    );

    const originalName =
      documentFile.name ||
      "identity-document";

    const extension =
      path.extname(
        originalName
      ).toLowerCase() || ".bin";

    const safeBaseName =
      path
        .basename(
          originalName,
          extension
        )
        .replace(
          /[^a-zA-Z0-9-_]/g,
          "-"
        )
        .slice(0, 80) ||
      "identity-document";

    const uniqueFileName =
      `${Date.now()}-${crypto.randomUUID()}-${safeBaseName}${extension}`;

    savedFilePath =
      path.join(
        uploadDirectory,
        uniqueFileName
      );

    const fileBuffer =
      Buffer.from(
        await documentFile.arrayBuffer()
      );

    await fs.writeFile(
      savedFilePath,
      fileBuffer
    );

    const documentUrl =
      `/uploads/identity/${uniqueFileName}`;

    /*
     * Create account and related records
     */

    const passwordHash =
      await bcrypt.hash(
        password,
        12
      );

    const user =
      await prisma.$transaction(
        async (tx) => {
          const stcUserNumber =
            await generateUniqueStcUserNumber(
              tx
            );

          const referralCode =
            await generateUniqueReferralCode(
              tx
            );

          const newUser =
            await tx.user.create({
              data: {
                firstName,
                lastName,
                email,
                phone,
                passwordHash,
                role:
                  accountType as (typeof allowedRoles)[number],
                status: "PENDING",
                verified: false,
                stcUserNumber,
                referralCode,
                referredById:
                  referrerId,
              },
            });

          await tx.identityDocument.create({
            data: {
              userId: newUser.id,
              documentType:
                documentType as (typeof allowedDocumentTypes)[number],
              documentNumber:
                documentNumber || null,
              fileUrl: documentUrl,
              verificationStatus:
                "PENDING",
            },
          });

          const wallet =
            await tx.wallet.create({
              data: {
                userId: newUser.id,
                balance: 1000,
              },
            });

          await tx.walletTransaction.create({
            data: {
              walletId: wallet.id,
              reference:
                `WELCOME-${Date.now()}-${crypto.randomUUID()}`,
              type: "DEPOSIT",
              status: "SUCCESS",
              amount: 1000,
            },
          });

          await tx.pointsWallet.create({
            data: {
              userId: newUser.id,
              balance: 0,
            },
          });

          if (referrerId) {
            await tx.referral.create({
              data: {
                referrerId,
                referredUserId:
                  newUser.id,
                status: "PENDING",
                rewardPoints:
                  REFERRAL_REWARD_POINTS,
              },
            });
          }

          return newUser;
        }
      );

    return NextResponse.json(
      {
        success: true,
        message:
          "Registration submitted successfully. Your identity document is pending verification.",
        userId: user.id,
        stcUserNumber:
          user.stcUserNumber,
        referralCode:
          user.referralCode,
        referred:
          Boolean(referrerId),
        welcomeBonus: 1000,
        referralRewardPoints:
          referrerId
            ? REFERRAL_REWARD_POINTS
            : 0,
        verificationStatus:
          "PENDING",
        documentUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Registration error:",
      error
    );

    if (savedFilePath) {
      try {
        await fs.unlink(
          savedFilePath
        );
      } catch {
        // Ignore cleanup errors.
      }
    }

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to complete registration.",
      },
      { status: 500 }
    );
  }
}