-- Allow solution posts without an uploaded image.
ALTER TABLE "Solution" ALTER COLUMN "image" DROP NOT NULL;