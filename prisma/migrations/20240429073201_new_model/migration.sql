/*
  Warnings:

  - You are about to drop the `EcommerceProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EcommerceProducts" DROP CONSTRAINT "EcommerceProducts_userId_fkey";

-- DropTable
DROP TABLE "EcommerceProducts";

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "product" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
