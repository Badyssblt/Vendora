/*
  Warnings:

  - You are about to drop the column `theme` on the `Settings` table. All the data in the column will be lost.
  - Added the required column `siteName` to the `Settings` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "ThemeSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "siteName" TEXT NOT NULL
);
INSERT INTO "new_Settings" ("id") SELECT "id" FROM "Settings";
DROP TABLE "Settings";
ALTER TABLE "new_Settings" RENAME TO "Settings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
