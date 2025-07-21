-- AlterTable
ALTER TABLE `EventStore` ADD COLUMN `createdBy` VARCHAR(191) NOT NULL DEFAULT 'system';
