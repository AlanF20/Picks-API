/*
  Warnings:

  - You are about to alter the column `price` on the `guitar` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - Added the required column `imgUrl` to the `Guitar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `guitar` ADD COLUMN `imgUrl` LONGTEXT NOT NULL,
    MODIFY `price` DECIMAL NOT NULL DEFAULT 0.0;
