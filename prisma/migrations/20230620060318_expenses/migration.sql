/*
  Warnings:

  - You are about to drop the `Costs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `charity` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the column `clothing` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the column `coffee` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the column `education` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the column `food` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the column `gifts` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the column `healthcare` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the column `housing` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the column `personalCare` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the column `taxi` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the column `transportation` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the column `travel` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the column `bonus` on the `Income` table. All the data in the column will be lost.
  - You are about to drop the column `freelance` on the `Income` table. All the data in the column will be lost.
  - You are about to drop the column `gifts` on the `Income` table. All the data in the column will be lost.
  - You are about to drop the column `salary` on the `Income` table. All the data in the column will be lost.
  - Added the required column `category` to the `Expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Income` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Costs";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Expenses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "costsId" INTEGER NOT NULL,
    "expenseValue" INTEGER,
    "category" TEXT NOT NULL,
    CONSTRAINT "Expenses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Expenses" ("costsId", "createdAt", "expenseValue", "id") SELECT "costsId", "createdAt", "expenseValue", "id" FROM "Expenses";
DROP TABLE "Expenses";
ALTER TABLE "new_Expenses" RENAME TO "Expenses";
CREATE TABLE "new_Income" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "costsId" INTEGER NOT NULL,
    "userId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "incomeValue" INTEGER,
    "category" TEXT NOT NULL,
    CONSTRAINT "Income_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Income" ("costsId", "createdAt", "id", "incomeValue") SELECT "costsId", "createdAt", "id", "incomeValue" FROM "Income";
DROP TABLE "Income";
ALTER TABLE "new_Income" RENAME TO "Income";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
