import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "featured_spaces_spaces" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"space_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "featured_spaces" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "spaces" DROP CONSTRAINT "spaces_settings_background_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "spaces_settings_settings_background_image_idx";
  ALTER TABLE "spaces_images" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "spaces" ALTER COLUMN "texts" SET DEFAULT '[{"id":"text_1772260532192","size":{"width":24.30939226519337,"height":8.573591938959753},"content":"Add text, image or page ➡️","fontSize":21,"isEdited":false,"position":{"x":73.27348066298343,"y":89.38882093696002},"fontColor":"#000000"},{"id":"text_1772260613253","size":{"width":30.801104972375693,"height":9.194866717145242},"content":"Preview changes, adjust settings and save your space ↗️","fontSize":19,"isEdited":false,"position":{"x":68.02486187845305,"y":3.5907740695439525},"fontColor":"#000000"},{"id":"text_1772260713388","size":{"width":27.624309392265197,"height":14.165064942629158},"content":"Welcome to your space editor. Click any of the text tips to delete 🗑️","fontSize":18,"isEdited":false,"position":{"x":34.944751381215475,"y":42.047682839225736},"fontColor":"#785fa5"}]'::jsonb;
  ALTER TABLE "spaces" ADD COLUMN "description" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "featured_spaces_id" integer;
  DO $$ BEGIN
   ALTER TABLE "featured_spaces_spaces" ADD CONSTRAINT "featured_spaces_spaces_space_id_spaces_id_fk" FOREIGN KEY ("space_id") REFERENCES "public"."spaces"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "featured_spaces_spaces" ADD CONSTRAINT "featured_spaces_spaces_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."featured_spaces"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "featured_spaces_spaces_order_idx" ON "featured_spaces_spaces" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "featured_spaces_spaces_parent_id_idx" ON "featured_spaces_spaces" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "featured_spaces_spaces_space_idx" ON "featured_spaces_spaces" USING btree ("space_id");
  CREATE INDEX IF NOT EXISTS "featured_spaces_updated_at_idx" ON "featured_spaces" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "featured_spaces_created_at_idx" ON "featured_spaces" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_featured_spaces_fk" FOREIGN KEY ("featured_spaces_id") REFERENCES "public"."featured_spaces"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_featured_spaces_id_idx" ON "payload_locked_documents_rels" USING btree ("featured_spaces_id");
  ALTER TABLE "spaces" DROP COLUMN IF EXISTS "settings_site_title";
  ALTER TABLE "spaces" DROP COLUMN IF EXISTS "settings_site_description";
  ALTER TABLE "spaces" DROP COLUMN IF EXISTS "settings_background_image_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "featured_spaces_spaces" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "featured_spaces" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "featured_spaces_spaces" CASCADE;
  DROP TABLE "featured_spaces" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_featured_spaces_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_featured_spaces_id_idx";
  ALTER TABLE "spaces_images" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "spaces" ALTER COLUMN "texts" SET DEFAULT '[]'::jsonb;
  ALTER TABLE "spaces" ADD COLUMN "settings_site_title" varchar;
  ALTER TABLE "spaces" ADD COLUMN "settings_site_description" varchar;
  ALTER TABLE "spaces" ADD COLUMN "settings_background_image_id" integer;
  DO $$ BEGIN
   ALTER TABLE "spaces" ADD CONSTRAINT "spaces_settings_background_image_id_media_id_fk" FOREIGN KEY ("settings_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "spaces_settings_settings_background_image_idx" ON "spaces" USING btree ("settings_background_image_id");
  ALTER TABLE "spaces" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "featured_spaces_id";`)
}
