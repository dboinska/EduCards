/*
  Warnings:

  - You are about to drop the `_SuggestionCatalogs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SuggestionCatalogs" DROP CONSTRAINT "_SuggestionCatalogs_A_fkey";

-- DropForeignKey
ALTER TABLE "_SuggestionCatalogs" DROP CONSTRAINT "_SuggestionCatalogs_B_fkey";

-- DropTable
DROP TABLE "_SuggestionCatalogs";
