/*
  Warnings:

  - You are about to drop the column `minutesPerDay` on the `StudyPlan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StudyPlan" DROP COLUMN "minutesPerDay",
ADD COLUMN     "secondsPerDay" INTEGER NOT NULL DEFAULT 900;
