-- CreateEnum
CREATE TYPE "Level" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('DAILY', 'EVERY2DAYS', 'EVERY4DAYS', 'WEEKLY', 'EVERY2WEEKS', 'MONTHLY', 'EVERY2MONTHS');

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "drawerId" TEXT;

-- CreateTable
CREATE TABLE "Drawer" (
    "drawerId" TEXT NOT NULL,
    "catalogId" TEXT NOT NULL,
    "levelName" "Level" NOT NULL DEFAULT 'BEGINNER',
    "frequency" "Frequency" NOT NULL DEFAULT 'DAILY',
    "numberOfCards" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Drawer_pkey" PRIMARY KEY ("drawerId")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_drawerId_fkey" FOREIGN KEY ("drawerId") REFERENCES "Drawer"("drawerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Drawer" ADD CONSTRAINT "Drawer_catalogId_fkey" FOREIGN KEY ("catalogId") REFERENCES "Catalog"("catalogId") ON DELETE CASCADE ON UPDATE CASCADE;
