/*
  Warnings:

  - Added the required column `isLatest` to the `Newspaper` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Newspaper" ADD COLUMN     "isLatest" BOOLEAN NOT NULL;
