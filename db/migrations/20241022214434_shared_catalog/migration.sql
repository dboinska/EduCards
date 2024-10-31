-- AlterTable
ALTER TABLE "Drawer" ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "SharedCatalog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "catalogId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SharedCatalog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SharedCatalog" ADD CONSTRAINT "SharedCatalog_catalogId_fkey" FOREIGN KEY ("catalogId") REFERENCES "Catalog"("catalogId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedCatalog" ADD CONSTRAINT "SharedCatalog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
