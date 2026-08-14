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

export async function POST(request: NextRequest) {
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
          message: "Invalid identity document type.",
        },
        { status: 400 }
      );
    }

    if (documentFile.size === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "The selected identity document is empty.",
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

    if (!allowedMimeTypes.includes(documentFile.type)) {
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
          message: "Phone number already exists.",
        },
        { status: 409 }
      );
    }

    /*
     * Save identity document
     */

    const uploadDirectory = path.join(
      process.cwd(),
      "public",
      "uploads",
      "identity"
    );

    await fs.mkdir(uploadDirectory, {
      recursive: true,
    });

    const originalName =
      documentFile.name || "identity-document";

    const extension =
      path.extname(originalName).toLowerCase() ||
      ".bin";

    const safeBaseName =
      path
        .basename(originalName, extension)
        .replace(/[^a-zA-Z0-9-_]/g, "-")
        .slice(0, 80) || "identity-document";

    const uniqueFileName = `${Date.now()}-${crypto.randomUUID()}-${safeBaseName}${extension}`;

    savedFilePath = path.join(
      uploadDirectory,
      uniqueFileName
    );

    const fileBuffer = Buffer.from(
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
      await bcrypt.hash(password, 12);

    const user = await prisma.$transaction(
      async (tx) => {
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
            verificationStatus: "PENDING",
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
            reference: `WELCOME-${Date.now()}`,
            type: "DEPOSIT",
            status: "SUCCESS",
            amount: 1000,
          },
        });

        return newUser;
      }
    );

    return NextResponse.json(
      {
        success: true,
        message:
          "Registration submitted successfully. Your identity document is pending verification.",
        userId: user.id,
        welcomeBonus: 1000,
        verificationStatus: "PENDING",
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
        await fs.unlink(savedFilePath);
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