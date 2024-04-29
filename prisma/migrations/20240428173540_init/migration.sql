/*
  Warnings:

  - Added the required column `userId` to the `OTPVerify` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OTPVerify" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EcommerceProducts" (
    "id" SERIAL NOT NULL,
    "product" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "EcommerceProducts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Post_name_idx" ON "Post"("name");

-- AddForeignKey
ALTER TABLE "EcommerceProducts" ADD CONSTRAINT "EcommerceProducts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
