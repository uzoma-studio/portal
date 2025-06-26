import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ALTER COLUMN "theme_config_display_mode" SET DEFAULT 'hotspot';
  ALTER TABLE "pages" ALTER COLUMN "theme_config_style" SET DEFAULT '{"borderWidth":"3px","backgroundColor":"#ffffff","textColor":"#222222","pageDisplayStyle":"center-modal","backgroundImage":null}'::jsonb;
  ALTER TABLE "spaces" ALTER COLUMN "settings_theme" SET DEFAULT '{"style":{"menu":{"defaultHeight":"3.5rem","backgroundColor":"#cccccc","showNewsTicker":true,"showFooter":true},"bodyFont":"Courier New","headerFont":"Courier New","defaultPageStyles":{"borderWidth":"3px","backgroundColor":"#ffffff","textColor":"#222222","pageDisplayStyle":"center-modal"},"accentColor":"#ffffff","defaultPageDisplayMode":"hotspot","hotspotSize":"25","hotspotColor":"#82007f","primaryColor":"#9333ea","bodyTextColor":"#222222","backgroundMode":"image","secondaryColor":"#c084fc","backgroundColor":"#ffffff","headerTextColor":"#222222","contentTextColor":"#222222","backgroundImageRenderMode":"background","environment":"park","showEnvironment":false}}'::jsonb;
  ALTER TABLE "pages" ADD COLUMN "cover_image_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_cover_image_idx" ON "pages" USING btree ("cover_image_id");
  ALTER TABLE "public"."pages" ALTER COLUMN "theme_config_display_mode" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_theme_config_display_mode";
  CREATE TYPE "public"."enum_pages_theme_config_display_mode" AS ENUM('icon', 'hotspot', 'list', 'image', 'window');
  ALTER TABLE "public"."pages" ALTER COLUMN "theme_config_display_mode" SET DATA TYPE "public"."enum_pages_theme_config_display_mode" USING "theme_config_display_mode"::"public"."enum_pages_theme_config_display_mode";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DROP CONSTRAINT "pages_cover_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "pages_cover_image_idx";
  ALTER TABLE "pages" ALTER COLUMN "theme_config_display_mode" SET DEFAULT 'icon';
  ALTER TABLE "pages" ALTER COLUMN "theme_config_style" SET DEFAULT '{"borderColor":"#82007f","borderWidth":"3px","backgroundColor":"#ffffff","textColor":"#222222","font":"Courier New","pageDisplayStyle":"page-position-modal","backgroundImage":null}'::jsonb;
  ALTER TABLE "spaces" ALTER COLUMN "settings_theme" SET DEFAULT '{"style":{"menu":{"defaultHeight":"3.5rem","backgroundColor":"#cccccc","showNewsTicker":true,"showFooter":true},"bodyFont":"Courier New","headerFont":"Courier New","defaultPageStyles":{"borderColor":"#82007f","borderWidth":"3px","backgroundColor":"#ffffff","textColor":"#222222","font":"Courier New","pageDisplayStyle":"page-position-modal"},"accentColor":"#ffffff","defaultPageDisplayMode":"icon","hotspotSize":"25","hotspotColor":"#82007f","primaryColor":"#9333ea","bodyTextColor":"#222222","backgroundMode":"image","secondaryColor":"#c084fc","backgroundColor":"#ffffff","headerFontColor":"#222222","contentTextColor":"#222222","backgroundImageRenderMode":"background","environment":"park","showEnvironment":false}}'::jsonb;
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "cover_image_id";
  ALTER TABLE "public"."pages" ALTER COLUMN "theme_config_display_mode" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_theme_config_display_mode";
  CREATE TYPE "public"."enum_pages_theme_config_display_mode" AS ENUM('icon', 'hotspot', 'list', 'island', 'windows');
  ALTER TABLE "public"."pages" ALTER COLUMN "theme_config_display_mode" SET DATA TYPE "public"."enum_pages_theme_config_display_mode" USING "theme_config_display_mode"::"public"."enum_pages_theme_config_display_mode";`)
}
