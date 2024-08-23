-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "term" TEXT NOT NULL,
    "description" TEXT,
    "termTranslated" TEXT NOT NULL,
    "descriptionTranslated" TEXT,
    "imageURL" TEXT,
    "catalogId" TEXT NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_catalogId_fkey" FOREIGN KEY ("catalogId") REFERENCES "Catalog"("catalogId") ON DELETE RESTRICT ON UPDATE CASCADE;
