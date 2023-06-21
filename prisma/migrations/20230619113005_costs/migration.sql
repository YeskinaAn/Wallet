-- CreateTable
CREATE TABLE "Costs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER,
    CONSTRAINT "Costs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Income" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "costsId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "salary" INTEGER,
    "freelance" INTEGER,
    "bonus" INTEGER,
    "gifts" INTEGER,
    CONSTRAINT "Income_costsId_fkey" FOREIGN KEY ("costsId") REFERENCES "Costs" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Expenses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "costsId" INTEGER NOT NULL,
    "charity" INTEGER,
    "food" INTEGER,
    "coffee" INTEGER,
    "healthcare" INTEGER,
    "personalCare" INTEGER,
    "clothing" INTEGER,
    "gifts" INTEGER,
    "travel" INTEGER,
    "transportation" INTEGER,
    "education" INTEGER,
    "housing" INTEGER,
    "taxi" INTEGER,
    CONSTRAINT "Expenses_costsId_fkey" FOREIGN KEY ("costsId") REFERENCES "Costs" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
