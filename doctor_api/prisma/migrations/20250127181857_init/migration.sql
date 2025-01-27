/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `user`;

-- RenameIndex
ALTER TABLE `doctor` RENAME INDEX `Doctor_email_key` TO `doctor_email_key`;

-- RenameIndex
ALTER TABLE `doctor` RENAME INDEX `Doctor_phone_key` TO `doctor_phone_key`;
