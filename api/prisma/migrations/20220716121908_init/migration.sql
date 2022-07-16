/*
  Warnings:

  - Made the column `projectId` on table `Bug` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bug" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT,
    "projectId" INTEGER NOT NULL,
    "creationDate" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Bug_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Bug_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Bug" ("creationDate", "description", "id", "projectId", "userId") SELECT "creationDate", "description", "id", "projectId", "userId" FROM "Bug";
DROP TABLE "Bug";
ALTER TABLE "new_Bug" RENAME TO "Bug";
CREATE UNIQUE INDEX "Bug_projectId_key" ON "Bug"("projectId");
CREATE UNIQUE INDEX "Bug_userId_key" ON "Bug"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
