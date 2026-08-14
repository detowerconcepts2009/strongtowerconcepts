-- Reconcile the profileImageUrl column that already exists
-- in the database but was missing from the migration history.

ALTER TABLE "public"."User"
ADD COLUMN IF NOT EXISTS "profileImageUrl" TEXT;