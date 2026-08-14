import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getCurrentUser } from "@/lib/auth";
import { r2, R2_BUCKET_NAME } from "@/lib/r2";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "No image file was provided.",
        },
        {
          status: 400,
        }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        {
          success: false,
          message: "Only image files are allowed.",
        },
        {
          status: 400,
        }
      );
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          message: "Image must be 5MB or smaller.",
        },
        {
          status: 400,
        }
      );
    }

    const extension =
      file.name.split(".").pop()?.toLowerCase() || "jpg";

    const objectKey = `users/${user.id}/profile-${Date.now()}.${extension}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await r2.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: objectKey,
        Body: buffer,
        ContentType: file.type,
      })
    );

    const imageUrl = `https://pub-17a59baa6f614b98b78f3050a75576ff.r2.dev/${objectKey}`;

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        profileImageUrl: imageUrl,
      },
    });

    return NextResponse.json(
      {
        success: true,
        imageUrl,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Profile image upload error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to upload profile image.",
      },
      {
        status: 500,
      }
    );
  }
}