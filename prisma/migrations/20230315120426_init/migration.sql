-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "authSchId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_authSchId_key" ON "User"("authSchId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
