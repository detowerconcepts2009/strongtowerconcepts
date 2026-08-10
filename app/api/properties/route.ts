import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

function generateSlug(title: string) {

  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") +
    "-" +
    Date.now()
  );

}

export async function GET() {

  try {

    const properties =
      await prisma.property.findMany({

        include: {

          listing: true,

          features: true,

          documents: true,

        },

        orderBy: {

          createdAt: "desc",

        },

      });

    return NextResponse.json(

      {

        success: true,

        properties,

      },

      {

        status: 200,

      }

    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(

      {

        success: false,

        message: "Unable to load properties.",

      },

      {

        status: 500,

      }

    );

  }

}

export async function POST(
  request: Request
) {

  try {

    const user =
      await getCurrentUser();

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

    const body =
      await request.json();

    const {

      title,

      category,

      purpose,

      state,

      lga,

      address,

      price,

    } = body;

    if (

      !title ||

      !category ||

      !purpose ||

      !state ||

      !lga ||

      !address ||

      !price

    ) {

      return NextResponse.json(

        {

          success: false,

          message:
            "Please complete all required fields.",

        },

        {

          status: 400,

        }

      );

    }

    const slug =
      generateSlug(title);

    const result =
      await prisma.$transaction(

        async (tx) => {

          const listing =
            await tx.listing.create({

              data: {

                ownerId: user.id,

                listingType: "PROPERTY",

                title,

                slug,

                description: "",

                price:
                  new Prisma.Decimal(price),

              },

            });

          const property =
            await tx.property.create({

              data: {

                listingId:
                  listing.id,

                category,

                purpose,

                state,

                city: lga,

                address,

              },

            });

          return {

            listing,

            property,

          };

        }

      );

    return NextResponse.json(

      {

        success: true,

        propertyId:
          result.property.id,

        listingId:
          result.listing.id,

        message:
          "Property created successfully.",

      },

      {

        status: 201,

      }

    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(

      {

        success: false,

        message:
          "Unable to create property.",

      },

      {

        status: 500,

      }

    );

  }

}