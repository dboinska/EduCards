-- CreateTable
CREATE TABLE "LearnSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "catalogId" TEXT NOT NULL,
    "drawerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "sessionStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sessionEnd" TIMESTAMP(3),
    "learnedCards" INTEGER DEFAULT 0,

    CONSTRAINT "LearnSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LearnSession" ADD CONSTRAINT "LearnSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearnSession" ADD CONSTRAINT "LearnSession_catalogId_fkey" FOREIGN KEY ("catalogId") REFERENCES "Catalog"("catalogId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearnSession" ADD CONSTRAINT "LearnSession_drawerId_fkey" FOREIGN KEY ("drawerId") REFERENCES "Drawer"("drawerId") ON DELETE CASCADE ON UPDATE CASCADE;
