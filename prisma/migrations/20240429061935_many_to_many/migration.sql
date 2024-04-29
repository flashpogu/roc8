/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `EcommerceProducts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EcommerceProducts_userId_key" ON "EcommerceProducts"("userId");
