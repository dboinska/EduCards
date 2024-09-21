-- CreateTable
CREATE TABLE "DrawerCard" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "drawerId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,

    CONSTRAINT "DrawerCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DrawerCard" ADD CONSTRAINT "DrawerCard_drawerId_fkey" FOREIGN KEY ("drawerId") REFERENCES "Drawer"("drawerId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrawerCard" ADD CONSTRAINT "DrawerCard_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("cardId") ON DELETE CASCADE ON UPDATE CASCADE;
