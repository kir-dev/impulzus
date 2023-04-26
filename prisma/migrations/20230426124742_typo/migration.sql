/*
  Warnings:

  - You are about to drop the column `titels` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Newspaper" ADD COLUMN     "coverImage" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "titels",
ADD COLUMN     "titles" TEXT[];
