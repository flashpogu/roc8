-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_userId_fkey";

-- CreateTable
CREATE TABLE "_ProductsToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductsToUser_AB_unique" ON "_ProductsToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductsToUser_B_index" ON "_ProductsToUser"("B");

-- AddForeignKey
ALTER TABLE "_ProductsToUser" ADD CONSTRAINT "_ProductsToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductsToUser" ADD CONSTRAINT "_ProductsToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
