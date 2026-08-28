-- Allow solution posts without content.
ALTER TABLE "Solution" ALTER COLUMN "content" DROP NOT NULL;