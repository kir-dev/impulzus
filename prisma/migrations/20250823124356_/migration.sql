-- CreateTable
CREATE TABLE "Impressum" (
    "id" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "details" TEXT NOT NULL,

    CONSTRAINT "Impressum_pkey" PRIMARY KEY ("id")
);
