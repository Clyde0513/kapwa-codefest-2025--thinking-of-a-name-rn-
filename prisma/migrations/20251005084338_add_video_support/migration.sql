-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "duration" DOUBLE PRECISION,
ADD COLUMN     "frameRate" DOUBLE PRECISION,
ADD COLUMN     "mediaType" TEXT NOT NULL DEFAULT 'image';

-- CreateIndex
CREATE INDEX "Photo_mediaType_idx" ON "Photo"("mediaType");
