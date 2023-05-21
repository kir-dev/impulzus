/*
  Warnings:

  - You are about to drop the column `type` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Newspaper" ADD COLUMN     "pdf" TEXT;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "type",
ADD COLUMN     "categories" TEXT[];

-- AlterTable
ALTER TABLE "User" DROP COLUMN "fullName",
ADD COLUMN     "isBoardMember" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT NOT NULL;
