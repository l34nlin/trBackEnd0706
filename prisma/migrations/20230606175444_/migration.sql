/*
  Warnings:

  - Added the required column `preparationTime` to the `Recipes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `recipes` ADD COLUMN `preparationTime` VARCHAR(191) NOT NULL;
