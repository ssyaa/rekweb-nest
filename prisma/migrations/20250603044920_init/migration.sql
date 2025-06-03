/*
  Warnings:

  - You are about to drop the column `createdAt` on the `jadwalsidang` table. All the data in the column will be lost.
  - You are about to drop the column `dosenPenguji1` on the `jadwalsidang` table. All the data in the column will be lost.
  - You are about to drop the column `dosenPenguji2` on the `jadwalsidang` table. All the data in the column will be lost.
  - You are about to drop the column `judulSkripsi` on the `jadwalsidang` table. All the data in the column will be lost.
  - You are about to drop the column `mahasiswaId` on the `jadwalsidang` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalSidang` on the `jadwalsidang` table. All the data in the column will be lost.
  - You are about to drop the column `waktuSidang` on the `jadwalsidang` table. All the data in the column will be lost.
  - You are about to drop the column `alasanDitolak` on the `pengajuansidang` table. All the data in the column will be lost.
  - You are about to drop the column `fileBerkas` on the `pengajuansidang` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalDiajukan` on the `pengajuansidang` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalSidang` on the `pengajuansidang` table. All the data in the column will be lost.
  - You are about to drop the column `waktuSidang` on the `pengajuansidang` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pengajuanId]` on the table `JadwalSidang` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dosenPenguji1Id` to the `JadwalSidang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dosenPenguji2Id` to the `JadwalSidang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pengajuanId` to the `JadwalSidang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal` to the `JadwalSidang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waktu` to the `JadwalSidang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `berkasUrl` to the `PengajuanSidang` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `jadwalsidang` DROP FOREIGN KEY `JadwalSidang_mahasiswaId_fkey`;

-- DropIndex
DROP INDEX `JadwalSidang_mahasiswaId_fkey` ON `jadwalsidang`;

-- AlterTable
ALTER TABLE `jadwalsidang` DROP COLUMN `createdAt`,
    DROP COLUMN `dosenPenguji1`,
    DROP COLUMN `dosenPenguji2`,
    DROP COLUMN `judulSkripsi`,
    DROP COLUMN `mahasiswaId`,
    DROP COLUMN `tanggalSidang`,
    DROP COLUMN `waktuSidang`,
    ADD COLUMN `dosenPenguji1Id` VARCHAR(191) NOT NULL,
    ADD COLUMN `dosenPenguji2Id` VARCHAR(191) NOT NULL,
    ADD COLUMN `pengajuanId` VARCHAR(191) NOT NULL,
    ADD COLUMN `tanggal` DATETIME(3) NOT NULL,
    ADD COLUMN `waktu` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `mahasiswa` ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `prodi` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `pengajuansidang` DROP COLUMN `alasanDitolak`,
    DROP COLUMN `fileBerkas`,
    DROP COLUMN `tanggalDiajukan`,
    DROP COLUMN `tanggalSidang`,
    DROP COLUMN `waktuSidang`,
    ADD COLUMN `alasanPenolakan` VARCHAR(191) NULL,
    ADD COLUMN `berkasUrl` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Dosen` (
    `id` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `JadwalSidang_pengajuanId_key` ON `JadwalSidang`(`pengajuanId`);

-- CreateIndex
CREATE INDEX `JadwalSidang_pengajuanId_idx` ON `JadwalSidang`(`pengajuanId`);

-- CreateIndex
CREATE INDEX `JadwalSidang_dosenPenguji1Id_idx` ON `JadwalSidang`(`dosenPenguji1Id`);

-- CreateIndex
CREATE INDEX `JadwalSidang_dosenPenguji2Id_idx` ON `JadwalSidang`(`dosenPenguji2Id`);

-- AddForeignKey
ALTER TABLE `JadwalSidang` ADD CONSTRAINT `JadwalSidang_pengajuanId_fkey` FOREIGN KEY (`pengajuanId`) REFERENCES `PengajuanSidang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JadwalSidang` ADD CONSTRAINT `JadwalSidang_dosenPenguji1Id_fkey` FOREIGN KEY (`dosenPenguji1Id`) REFERENCES `Dosen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JadwalSidang` ADD CONSTRAINT `JadwalSidang_dosenPenguji2Id_fkey` FOREIGN KEY (`dosenPenguji2Id`) REFERENCES `Dosen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `pengajuansidang` RENAME INDEX `PengajuanSidang_mahasiswaId_fkey` TO `PengajuanSidang_mahasiswaId_idx`;
