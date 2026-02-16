import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_theme_config_display_mode" ADD VALUE 'none' BEFORE 'icon';
  CREATE TABLE IF NOT EXISTS "spaces_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"size_width" numeric,
  	"size_height" numeric,
  	"position_x" numeric,
  	"position_y" numeric,
  	"link_to_page_id" integer
  );
  
  DO $$ BEGIN
   ALTER TABLE "spaces_images" ADD CONSTRAINT "spaces_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "spaces_images" ADD CONSTRAINT "spaces_images_link_to_page_id_pages_id_fk" FOREIGN KEY ("link_to_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "spaces_images" ADD CONSTRAINT "spaces_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."spaces"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "spaces_images_order_idx" ON "spaces_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "spaces_images_parent_id_idx" ON "spaces_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "spaces_images_image_idx" ON "spaces_images" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "spaces_images_link_to_page_idx" ON "spaces_images" USING btree ("link_to_page_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "spaces_images" CASCADE;
  ALTER TABLE "public"."pages" ALTER COLUMN "theme_config_display_mode" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_theme_config_display_mode";
  CREATE TYPE "public"."enum_pages_theme_config_display_mode" AS ENUM('icon', 'hotspot', 'list', 'image', 'window');
  ALTER TABLE "public"."pages" ALTER COLUMN "theme_config_display_mode" SET DATA TYPE "public"."enum_pages_theme_config_display_mode" USING "theme_config_display_mode"::"public"."enum_pages_theme_config_display_mode";`)
}
