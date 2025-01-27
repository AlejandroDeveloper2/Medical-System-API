/*
  Warnings:

  - Added the required column `specialty` to the `doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `doctor` ADD COLUMN `specialty` VARCHAR(191) NOT NULL;
