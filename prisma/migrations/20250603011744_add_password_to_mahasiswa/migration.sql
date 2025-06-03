/*
  Warnings:

  - The primary key for the `mahasiswa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `mahasiswa` table. All the data in the column will be lost.
  - Added the required column `password` to the `Mahasiswa` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `jadwalsidang` DROP FOREIGN KEY `JadwalSidang_mahasiswaId_fkey`;

-- DropForeignKey
ALTER TABLE `pengajuansidang` DROP FOREIGN KEY `PengajuanSidang_mahasiswaId_fkey`;

-- DropIndex
DROP INDEX `JadwalSidang_mahasiswaId_fkey` ON `jadwalsidang`;

-- DropIndex
DROP INDEX `Mahasiswa_nim_key` ON `mahasiswa`;

-- DropIndex
DROP INDEX `PengajuanSidang_mahasiswaId_fkey` ON `pengajuansidang`;

-- AlterTable
ALTER TABLE `mahasiswa` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`nim`);

-- AddForeignKey
ALTER TABLE `PengajuanSidang` ADD CONSTRAINT `PengajuanSidang_mahasiswaId_fkey` FOREIGN KEY (`mahasiswaId`) REFERENCES `Mahasiswa`(`nim`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JadwalSidang` ADD CONSTRAINT `JadwalSidang_mahasiswaId_fkey` FOREIGN KEY (`mahasiswaId`) REFERENCES `Mahasiswa`(`nim`) ON DELETE RESTRICT ON UPDATE CASCADE;
