/*
  Warnings:

  - You are about to drop the column `password` on the `mahasiswa` table. All the data in the column will be lost.
  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Mahasiswa` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `mahasiswa` DROP COLUMN `password`,
    ADD COLUMN `userId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `admin`;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'MAHASISWA') NOT NULL DEFAULT 'MAHASISWA',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Mahasiswa_userId_key` ON `Mahasiswa`(`userId`);

-- AddForeignKey
ALTER TABLE `Mahasiswa` ADD CONSTRAINT `Mahasiswa_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
