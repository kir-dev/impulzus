/*
  Warnings:

  - You are about to drop the `Impressum` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Impressum";

-- CreateTable
CREATE TABLE "Texts" (
    "id" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contentHu" TEXT NOT NULL,
    "contentEn" TEXT NOT NULL,

    CONSTRAINT "Texts_pkey" PRIMARY KEY ("id")
);
