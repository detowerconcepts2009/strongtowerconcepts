import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

const ALLOWED_ROLES = ["SUPER_ADMIN", "ADMIN", "STAFF"];

const ORDER_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "READY_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
] as const;

const PAYMENT_STATUSES = [
  "UNPAID",
  "PENDING",
  "PAID",
  "FAILED",
  "REFUNDED",
] as const;

type OrderStatus = (typeof ORDER_STATUSES)[number];
type PaymentStatus = (typeof PAYMENT_STATUSES)[number];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    if (!ALLOWED_ROLES.includes(user.role)) {
      return NextResponse.json(
        {
          success: false,
          message: "You do not have permission to update orders.",
        },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const orderStatus = body.status as OrderStatus | undefined;
    const paymentStatus = body.paymentStatus as PaymentStatus | undefined;

    if (!orderStatus && !paymentStatus) {
      return NextResponse.json(
        {
          success: false,
          message: "No order or payment status was provided.",
        },
        { status: 400 }
      );
    }

    if (
      orderStatus &&
      !ORDER_STATUSES.includes(orderStatus)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid order status.",
        },
        { status: 400 }
      );
    }

    if (
      paymentStatus &&
      !PAYMENT_STATUSES.includes(paymentStatus)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment status.",
        },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const existingOrder = await tx.order.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          orderNumber: true,
          userId: true,
          status: true,
          paymentStatus: true,
        },
      });

      if (!existingOrder) {
        return {
          notFound: true as const,
        };
      }

      const updateData: {
        status?: OrderStatus;
        paymentStatus?: PaymentStatus;
      } = {};

      if (orderStatus) {
        updateData.status = orderStatus;
      }

      if (paymentStatus) {
        updateData.paymentStatus = paymentStatus;
      }

      const updatedOrder = await tx.order.update({
        where: {
          id,
        },
        data: updateData,
        select: {
          id: true,
          orderNumber: true,
          status: true,
          paymentStatus: true,
          updatedAt: true,
        },
      });

      let referralRewarded = false;
      let referralRewardPoints = 0;

      /*
       * Referral qualification:
       *
       * A referred customer qualifies when their first STC
       * order becomes PAID.
       *
       * The reward is processed only when the order changes
       * from a non-PAID state to PAID.
       */
      const becamePaid =
        paymentStatus === "PAID" &&
        existingOrder.paymentStatus !== "PAID";

      if (becamePaid && existingOrder.userId) {
        const referral = await tx.referral.findUnique({
          where: {
            referredUserId: existingOrder.userId,
          },
          select: {
            id: true,
            referrerId: true,
            referredUserId: true,
            status: true,
            rewardPoints: true,
          },
        });

        if (
          referral &&
          referral.status === "PENDING"
        ) {
          /*
           * First mark the referral as QUALIFIED.
           * This happens inside the same transaction as the
           * points credit, so an error rolls everything back.
           */
          await tx.referral.update({
            where: {
              id: referral.id,
            },
            data: {
              status: "QUALIFIED",
              qualifyingAction: `FIRST_PAID_ORDER:${existingOrder.orderNumber}`,
            },
          });

          const pointsWallet = await tx.pointsWallet.upsert({
            where: {
              userId: referral.referrerId,
            },
            create: {
              userId: referral.referrerId,
              balance: 0,
            },
            update: {},
          });

          const transactionReference =
            `REFERRAL-${referral.id}`;

          await tx.pointsTransaction.create({
            data: {
              walletId: pointsWallet.id,
              userId: referral.referrerId,
              reference: transactionReference,
              type: "REFERRAL_REWARD",
              status: "SUCCESS",
              amount: referral.rewardPoints,
              description:
                `Referral reward for referring a customer who completed their first successful STC order (${existingOrder.orderNumber}).`,
            },
          });

          await tx.pointsWallet.update({
            where: {
              id: pointsWallet.id,
            },
            data: {
              balance: {
                increment: referral.rewardPoints,
              },
            },
          });

          await tx.referral.update({
            where: {
              id: referral.id,
            },
            data: {
              status: "REWARDED",
              rewardedAt: new Date(),
            },
          });

          referralRewarded = true;
          referralRewardPoints = referral.rewardPoints;
        }
      }

      return {
        notFound: false as const,
        updatedOrder,
        referralRewarded,
        referralRewardPoints,
      };
    });

    if (result.notFound) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: result.referralRewarded
          ? `Order updated successfully. ${result.referralRewardPoints} STC Points awarded for the successful referral.`
          : "Order status updated successfully.",
        order: result.updatedOrder,
        referralRewarded: result.referralRewarded,
        referralRewardPoints: result.referralRewardPoints,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin order PATCH error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update order.",
      },
      { status: 500 }
    );
  }
}