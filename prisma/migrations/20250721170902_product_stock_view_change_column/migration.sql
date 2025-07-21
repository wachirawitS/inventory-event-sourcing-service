/*
  Warnings:

  - You are about to drop the column `productId` on the `ProductStockView` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productCode]` on the table `ProductStockView` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productCode` to the `ProductStockView` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `ProductStockView_productId_key` ON `ProductStockView`;

-- DropIndex
DROP INDEX `ProductStockView_productId_locationId_idx` ON `ProductStockView`;

-- AlterTable
ALTER TABLE `ProductStockView` DROP COLUMN `productId`,
    ADD COLUMN `productCode` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ProductStockView_productCode_key` ON `ProductStockView`(`productCode`);

-- CreateIndex
CREATE INDEX `ProductStockView_productCode_locationId_idx` ON `ProductStockView`(`productCode`, `locationId`);
