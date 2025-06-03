/*
  Warnings:

  - You are about to drop the column `penguji` on the `jadwalsidang` table. All the data in the column will be lost.
  - You are about to drop the column `ruang` on the `jadwalsidang` table. All the data in the column will be lost.
  - You are about to drop the column `tanggal` on the `jadwalsidang` table. All the data in the column will be lost.
  - The primary key for the `pengajuansidang` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `berkasUrl` on the `pengajuansidang` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `pengajuansidang` table. All the data in the column will be lost.
  - You are about to drop the column `nim` on the `pengajuansidang` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalPengajuan` on the `pengajuansidang` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `pengajuansidang` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `pengajuansidang` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dosenPenguji1` to the `JadwalSidang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dosenPenguji2` to the `JadwalSidang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `judulSkripsi` to the `JadwalSidang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mahasiswaId` to the `JadwalSidang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggalSidang` to the `JadwalSidang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waktuSidang` to the `JadwalSidang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileBerkas` to the `PengajuanSidang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mahasiswaId` to the `PengajuanSidang` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `pengajuansidang` DROP FOREIGN KEY `PengajuanSidang_userId_fkey`;

-- DropIndex
DROP INDEX `PengajuanSidang_userId_key` ON `pengajuansidang`;

-- AlterTable
ALTER TABLE `jadwalsidang` DROP COLUMN `penguji`,
    DROP COLUMN `ruang`,
    DROP COLUMN `tanggal`,
    ADD COLUMN `dosenPenguji1` VARCHAR(191) NOT NULL,
    ADD COLUMN `dosenPenguji2` VARCHAR(191) NOT NULL,
    ADD COLUMN `judulSkripsi` VARCHAR(191) NOT NULL,
    ADD COLUMN `mahasiswaId` VARCHAR(191) NOT NULL,
    ADD COLUMN `tanggalSidang` DATETIME(3) NOT NULL,
    ADD COLUMN `waktuSidang` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `pengajuansidang` DROP PRIMARY KEY,
    DROP COLUMN `berkasUrl`,
    DROP COLUMN `nama`,
    DROP COLUMN `nim`,
    DROP COLUMN `tanggalPengajuan`,
    DROP COLUMN `userId`,
    ADD COLUMN `alasanDitolak` VARCHAR(191) NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `fileBerkas` VARCHAR(191) NOT NULL,
    ADD COLUMN `mahasiswaId` VARCHAR(191) NOT NULL,
    ADD COLUMN `tanggalDiajukan` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `status` ENUM('MENUNGGU', 'DISETUJUI', 'DITOLAK') NOT NULL DEFAULT 'MENUNGGU',
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Admin` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mahasiswa` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `nim` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Mahasiswa_nim_key`(`nim`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PengajuanSidang` ADD CONSTRAINT `PengajuanSidang_mahasiswaId_fkey` FOREIGN KEY (`mahasiswaId`) REFERENCES `Mahasiswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JadwalSidang` ADD CONSTRAINT `JadwalSidang_mahasiswaId_fkey` FOREIGN KEY (`mahasiswaId`) REFERENCES `Mahasiswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
