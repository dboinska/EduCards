/*
  Warnings:

  - You are about to drop the column `drawerId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `imageURL` on the `Card` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "FavoriteType" AS ENUM ('CARD', 'CATALOG');

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_drawerId_fkey";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "drawerId",
DROP COLUMN "imageURL",
ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cover" TEXT,
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "favoriteType" "FavoriteType" NOT NULL,
    "userId" TEXT NOT NULL,
    "catalogId" TEXT,
    "cardId" TEXT,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_catalogId_cardId_key" ON "Favorite"("userId", "catalogId", "cardId");

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_catalogId_fkey" FOREIGN KEY ("catalogId") REFERENCES "Catalog"("catalogId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("cardId") ON DELETE CASCADE ON UPDATE CASCADE;
