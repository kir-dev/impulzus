/*
  Warnings:

  - Added the required column `grade` to the `Newspaper` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Newspaper" ADD COLUMN     "grade" INTEGER NOT NULL;
