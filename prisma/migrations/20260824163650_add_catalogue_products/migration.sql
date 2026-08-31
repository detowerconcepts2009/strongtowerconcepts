-- CreateEnum
CREATE TYPE "CatalogueProductType" AS ENUM ('MATTRESS', 'PILLOW');

-- CreateTable
CREATE TABLE "CatalogueProduct" (
    "id" TEXT NOT NULL,
    "productType" "CatalogueProductType" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CatalogueProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CatalogueProductImage" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CatalogueProductImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CatalogueProduct_productType_idx" ON "CatalogueProduct"("productType");

-- CreateIndex
CREATE INDEX "CatalogueProduct_active_idx" ON "CatalogueProduct"("active");

-- CreateIndex
CREATE INDEX "CatalogueProductImage_productId_idx" ON "CatalogueProductImage"("productId");

-- CreateIndex
CREATE INDEX "CatalogueProductImage_productId_isPrimary_idx" ON "CatalogueProductImage"("productId", "isPrimary");

-- AddForeignKey
ALTER TABLE "CatalogueProductImage" ADD CONSTRAINT "CatalogueProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "CatalogueProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;
