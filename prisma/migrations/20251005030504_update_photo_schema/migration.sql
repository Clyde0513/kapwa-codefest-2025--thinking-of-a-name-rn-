/*
  Warnings:

  - Added the required column `bytes` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `format` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Made the column `width` on table `Photo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `height` on table `Photo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "bytes" INTEGER NOT NULL,
ADD COLUMN     "format" TEXT NOT NULL,
ALTER COLUMN "width" SET NOT NULL,
ALTER COLUMN "height" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Photo_publicId_idx" ON "Photo"("publicId");

-- CreateIndex
CREATE INDEX "Photo_createdAt_idx" ON "Photo"("createdAt");
