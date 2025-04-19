/*
  Warnings:

  - You are about to drop the `Idea` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Idea";

-- CreateTable
CREATE TABLE "Meeting" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "date" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);
