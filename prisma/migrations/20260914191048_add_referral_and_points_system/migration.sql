-- CreateEnum
CREATE TYPE "ReferralStatus" AS ENUM ('PENDING', 'QUALIFIED', 'REWARDED', 'REJECTED');

-- CreateEnum
CREATE TYPE "PointsTransactionType" AS ENUM ('REFERRAL_REWARD', 'SERVICE_REDEMPTION', 'PRODUCT_DISCOUNT', 'ADJUSTMENT', 'REVERSAL');

-- CreateEnum
CREATE TYPE "PointsTransactionStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'CANCELLED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "referralCode" TEXT,
ADD COLUMN     "referredById" TEXT,
ADD COLUMN     "stcUserNumber" TEXT;

-- CreateTable
CREATE TABLE "Referral" (
    "id" TEXT NOT NULL,
    "referrerId" TEXT NOT NULL,
    "referredUserId" TEXT NOT NULL,
    "status" "ReferralStatus" NOT NULL DEFAULT 'PENDING',
    "rewardPoints" INTEGER NOT NULL DEFAULT 1000,
    "qualifyingAction" TEXT,
    "rewardedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PointsWallet" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PointsWallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PointsTransaction" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "type" "PointsTransactionType" NOT NULL,
    "status" "PointsTransactionStatus" NOT NULL DEFAULT 'SUCCESS',
    "amount" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PointsTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Referral_referredUserId_key" ON "Referral"("referredUserId");

-- CreateIndex
CREATE INDEX "Referral_referrerId_idx" ON "Referral"("referrerId");

-- CreateIndex
CREATE INDEX "Referral_status_idx" ON "Referral"("status");

-- CreateIndex
CREATE INDEX "Referral_createdAt_idx" ON "Referral"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "PointsWallet_userId_key" ON "PointsWallet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PointsTransaction_reference_key" ON "PointsTransaction"("reference");

-- CreateIndex
CREATE INDEX "PointsTransaction_walletId_idx" ON "PointsTransaction"("walletId");

-- CreateIndex
CREATE INDEX "PointsTransaction_userId_idx" ON "PointsTransaction"("userId");

-- CreateIndex
CREATE INDEX "PointsTransaction_type_idx" ON "PointsTransaction"("type");

-- CreateIndex
CREATE INDEX "PointsTransaction_createdAt_idx" ON "PointsTransaction"("createdAt");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_referredById_fkey" FOREIGN KEY ("referredById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referredUserId_fkey" FOREIGN KEY ("referredUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointsWallet" ADD CONSTRAINT "PointsWallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointsTransaction" ADD CONSTRAINT "PointsTransaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "PointsWallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointsTransaction" ADD CONSTRAINT "PointsTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
