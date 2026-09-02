import { NextResponse } from "next/server";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getCurrentUser } from "@/lib/auth";
import { r2, R2_BUCKET_NAME } from "@/lib/r2";
import prisma from "@/lib/prisma";

const ALLOWED_ROLES = [
  "SUPER_ADMIN",
  "ADMIN",
  "STAFF",
];

function isAllowedRole(role: string) {
  return ALLOWED_ROLES.includes(role);
}

function getObjectKeyFromUrl(imageUrl: string) {
  const marker = ".r2.dev/";

  const markerIndex = imageUrl.indexOf(marker);

  if (markerIndex === -1) {
    return null;
  }

  return decodeURIComponent(
    imageUrl.slice(markerIndex + marker.length)
  );
}

function parseOptionalPrice(
  value: unknown
): number | null | "INVALID" {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const numericValue =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value.replace(/,/g, "").trim())
        : NaN;

  if (
    !Number.isFinite(numericValue) ||
    numericValue < 0
  ) {
    return "INVALID";
  }

  return numericValue;
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
            "You do not have permission to manage catalogue products.",
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

export async function GET() {
  try {
    const { response } =
      await requireCatalogueManager();

    if (response) {
      return response;
    }

    const products =
      await prisma.catalogueProduct.findMany({
        orderBy: {
          createdAt: "desc",
        },
        include: {
          images: {
            orderBy: {
              createdAt: "desc",
            },
            select: {
              id: true,
              imageUrl: true,
              isPrimary: true,
              createdAt: true,
            },
          },
        },
      });

    return NextResponse.json(
      {
        success: true,
        products,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Catalogue products GET error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to load catalogue products.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { response } =
      await requireCatalogueManager();

    if (response) {
      return response;
    }

    const body = await request.json();

    const productType = body?.productType;

    const name =
      typeof body?.name === "string"
        ? body.name.trim()
        : "";

    const description =
      typeof body?.description === "string"
        ? body.description.trim()
        : "";

    const parsedPrice =
      parseOptionalPrice(body?.price);

    if (
      productType !== "MATTRESS" &&
      productType !== "PILLOW"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Product type must be MATTRESS or PILLOW.",
        },
        {
          status: 400,
        }
      );
    }

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Product name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (parsedPrice === "INVALID") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Price must be a valid number greater than or equal to zero.",
        },
        {
          status: 400,
        }
      );
    }

    /*
     * Mattress prices are maintained in the detailed
     * mattress catalogue and may remain null here.
     *
     * Non-configurable catalogue products such as
     * pillows can store their selling price here.
     */
    const product =
      await prisma.catalogueProduct.create({
        data: {
          productType,
          name,
          description:
            description || null,
          price:
            parsedPrice === null
              ? null
              : parsedPrice,
        },
        include: {
          images: true,
        },
      });

    return NextResponse.json(
      {
        success: true,
        message:
          "Catalogue product created successfully.",
        product,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Catalogue products POST error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to create catalogue product.",
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

    const productId =
      typeof body?.productId === "string"
        ? body.productId.trim()
        : "";

    const hasName =
      typeof body?.name === "string";

    const hasDescription =
      Object.prototype.hasOwnProperty.call(
        body,
        "description"
      );

    const hasPrice =
      Object.prototype.hasOwnProperty.call(
        body,
        "price"
      );

    const hasActive =
      typeof body?.active === "boolean";

    if (!productId) {
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

    if (
      !hasName &&
      !hasDescription &&
      !hasPrice &&
      !hasActive
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "No product changes were provided.",
        },
        {
          status: 400,
        }
      );
    }

    const existingProduct =
      await prisma.catalogueProduct.findUnique({
        where: {
          id: productId,
        },
      });

    if (!existingProduct) {
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

    const data: {
      name?: string;
      description?: string | null;
      price?: number | null;
      active?: boolean;
    } = {};

    if (hasName) {
      const trimmedName =
        body.name.trim();

      if (!trimmedName) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Product name cannot be empty.",
          },
          {
            status: 400,
          }
        );
      }

      data.name = trimmedName;
    }

    if (hasDescription) {
      data.description =
        typeof body.description ===
        "string"
          ? body.description.trim() || null
          : null;
    }

    if (hasPrice) {
      const parsedPrice =
        parseOptionalPrice(body.price);

      if (parsedPrice === "INVALID") {
        return NextResponse.json(
          {
            success: false,
            message:
              "Price must be a valid number greater than or equal to zero.",
          },
          {
            status: 400,
          }
        );
      }

      data.price =
        parsedPrice;
    }

    if (hasActive) {
      data.active = body.active;
    }

    const product =
      await prisma.catalogueProduct.update({
        where: {
          id: productId,
        },
        data,
        include: {
          images: {
            orderBy: {
              createdAt: "desc",
            },
            select: {
              id: true,
              imageUrl: true,
              isPrimary: true,
              createdAt: true,
            },
          },
        },
      });

    return NextResponse.json(
      {
        success: true,
        message:
          "Catalogue product updated successfully.",
        product,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Catalogue products PATCH error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to update catalogue product.",
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

    const productId =
      searchParams.get("productId")?.trim() ||
      "";

    if (!productId) {
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

    const product =
      await prisma.catalogueProduct.findUnique({
        where: {
          id: productId,
        },
        include: {
          images: true,
        },
      });

    if (!product) {
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

    /*
     * Remove stored objects from Cloudflare R2.
     *
     * Database deletion below is still allowed to proceed
     * if an individual R2 cleanup fails.
     */

    for (const image of product.images) {
      const objectKey =
        getObjectKeyFromUrl(
          image.imageUrl
        );

      if (!objectKey) {
        continue;
      }

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

    await prisma.catalogueProduct.delete({
      where: {
        id: productId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Catalogue product deleted successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Catalogue products DELETE error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to delete catalogue product.",
      },
      {
        status: 500,
      }
    );
  }
}