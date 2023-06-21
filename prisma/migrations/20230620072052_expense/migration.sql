/*
  Warnings:

  - You are about to drop the column `costsId` on the `Expenses` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Expenses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expenseValue" INTEGER,
    "category" TEXT NOT NULL,
    CONSTRAINT "Expenses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Expenses" ("category", "createdAt", "expenseValue", "id", "userId") SELECT "category", "createdAt", "expenseValue", "id", "userId" FROM "Expenses";
DROP TABLE "Expenses";
ALTER TABLE "new_Expenses" RENAME TO "Expenses";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
