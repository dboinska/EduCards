-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_catalogId_fkey";

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_catalogId_fkey" FOREIGN KEY ("catalogId") REFERENCES "Catalog"("catalogId") ON DELETE CASCADE ON UPDATE CASCADE;
