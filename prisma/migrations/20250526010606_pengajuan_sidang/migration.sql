-- CreateTable
CREATE TABLE `PengajuanSidang` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `nim` VARCHAR(191) NOT NULL,
    `judulSkripsi` VARCHAR(191) NOT NULL,
    `tanggalPengajuan` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `tanggalSidang` DATETIME(3) NULL,
    `waktuSidang` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL,
    `berkasUrl` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `PengajuanSidang_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
