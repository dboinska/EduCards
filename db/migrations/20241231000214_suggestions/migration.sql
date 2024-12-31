-- CreateTable
CREATE TABLE "_SuggestionCatalogs" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SuggestionCatalogs_AB_unique" ON "_SuggestionCatalogs"("A", "B");

-- CreateIndex
CREATE INDEX "_SuggestionCatalogs_B_index" ON "_SuggestionCatalogs"("B");

-- AddForeignKey
ALTER TABLE "_SuggestionCatalogs" ADD CONSTRAINT "_SuggestionCatalogs_A_fkey" FOREIGN KEY ("A") REFERENCES "Catalog"("catalogId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SuggestionCatalogs" ADD CONSTRAINT "_SuggestionCatalogs_B_fkey" FOREIGN KEY ("B") REFERENCES "Suggestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
