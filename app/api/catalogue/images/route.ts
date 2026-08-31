import { NextResponse } from "next/server";
import {
  DeleteObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getCurrentUser } from "@/lib/auth";
import { r2, R2_BUCKET_NAME } from "@/lib/r2";
import prisma from "@/lib/prisma";

const ALLOWED_ROLES = [
  "SUPER_ADMIN",
  "ADMIN",
  "STAFF",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const PUBLIC_R2_BASE_URL =
  "https://pub-17a59baa6f614b98b78f3050a75576ff.r2.dev";

function isAllowedRole(role: string) {
  return ALLOWED_ROLES.includes(role);
}

function getObjectKeyFromUrl(imageUrl: string) {
  const prefix =
    `${PUBLIC_R2_BASE_URL}/`;

  if (!imageUrl.startsWith(prefix)) {
    return null;
  }

  return decodeURIComponent(
    imageUrl.slice(prefix.length)
  );
}

async function requireCatalogueManager() {
  const user = await getCurrentUser();

  if (!user) {
    return {
      user: null,
      response: NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      ),
    };
  }

  if (!isAllowedRole(user.role)) {
    return {
      user: null,
      response: NextResponse.json(
        {
          success: false,
          message:
            "You do not have permission to manage catalogue images.",
        },
        {
          status: 403,
        }
      ),
    };
  }

  return {
    user,
    response: null,
  };
}

export async function POST(request: Request) {
  try {
    const { response } =
      await requireCatalogueManager();

    if (response) {
      return response;
    }

    const formData =
      await request.formData();

    const productId =
      formData.get("productId");

    const file =
      formData.get("file");

    const isPrimaryValue =
      formData.get("isPrimary");

    if (
      typeof productId !== "string" ||
      !productId.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Catalogue product ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "No image file was provided.",
        },
        {
          status: 400,
        }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Only JPG, PNG and WebP images are allowed.",
        },
        {
          status: 400,
        }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Image must be 5MB or smaller.",
        },
        {
          status: 400,
        }
      );
    }

    const catalogueProduct =
      await prisma.catalogueProduct.findUnique({
        where: {
          id: productId.trim(),
        },
      });

    if (!catalogueProduct) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Catalogue product not found.",
        },
        {
          status: 404,
        }
      );
    }

    let extension = "jpg";

    if (file.type === "image/png") {
      extension = "png";
    }

    if (file.type === "image/webp") {
      extension = "webp";
    }

    const objectKey =
      `catalogue/${catalogueProduct.productType.toLowerCase()}/` +
      `${catalogueProduct.id}/` +
      `image-${Date.now()}-${crypto.randomUUID()}.${extension}`;

    const buffer = Buffer.from(
      await file.arrayBuffer()
    );

    await r2.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: objectKey,
        Body: buffer,
        ContentType: file.type,
      })
    );

    const imageUrl =
      `${PUBLIC_R2_BASE_URL}/${objectKey}`;

    const isPrimary =
      isPrimaryValue === "true";

    if (isPrimary) {
      await prisma.catalogueProductImage.updateMany({
        where: {
          productId:
            catalogueProduct.id,
          isPrimary: true,
        },
        data: {
          isPrimary: false,
        },
      });
    }

    const image =
      await prisma.catalogueProductImage.create({
        data: {
          productId:
            catalogueProduct.id,
          imageUrl,
          isPrimary,
        },
      });

    return NextResponse.json(
      {
        success: true,
        message:
          "Catalogue image uploaded successfully.",
        image: {
          id: image.id,
          productId: image.productId,
          imageUrl: image.imageUrl,
          isPrimary: image.isPrimary,
          createdAt: image.createdAt,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Catalogue image upload error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to upload catalogue image.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { response } =
      await requireCatalogueManager();

    if (response) {
      return response;
    }

    const body = await request.json();

    const imageId =
      typeof body?.imageId === "string"
        ? body.imageId.trim()
        : "";

    if (!imageId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Image ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const image =
      await prisma.catalogueProductImage.findUnique(
        {
          where: {
            id: imageId,
          },
        }
      );

    if (!image) {
      return NextResponse.json(
        {
          success: false,
          message: "Image not found.",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.catalogueProductImage.updateMany({
      where: {
        productId: image.productId,
        isPrimary: true,
      },
      data: {
        isPrimary: false,
      },
    });

    const updatedImage =
      await prisma.catalogueProductImage.update({
        where: {
          id: imageId,
        },
        data: {
          isPrimary: true,
        },
      });

    return NextResponse.json(
      {
        success: true,
        message:
          "Primary image updated successfully.",
        image: updatedImage,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Catalogue image PATCH error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to update catalogue image.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { response } =
      await requireCatalogueManager();

    if (response) {
      return response;
    }

    const { searchParams } =
      new URL(request.url);

    const imageId =
      searchParams.get("imageId")?.trim() ||
      "";

    if (!imageId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Image ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const image =
      await prisma.catalogueProductImage.findUnique(
        {
          where: {
            id: imageId,
          },
        }
      );

    if (!image) {
      return NextResponse.json(
        {
          success: false,
          message: "Image not found.",
        },
        {
          status: 404,
        }
      );
    }

    if (image.isPrimary) {
      const replacement =
        await prisma.catalogueProductImage.findFirst({
          where: {
            productId: image.productId,
            id: {
              not: image.id,
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        });

      if (replacement) {
        await prisma.catalogueProductImage.update({
          where: {
            id: replacement.id,
          },
          data: {
            isPrimary: true,
          },
        });
      }
    }

    const objectKey =
      getObjectKeyFromUrl(image.imageUrl);

    if (objectKey) {
      try {
        await r2.send(
          new DeleteObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: objectKey,
          })
        );
      } catch (error) {
        console.error(
          "Catalogue image R2 delete error:",
          error
        );
      }
    }

    await prisma.catalogueProductImage.delete({
      where: {
        id: image.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Catalogue image deleted successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Catalogue image DELETE error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to delete catalogue image.",
      },
      {
        status: 500,
      }
    );
  }
}