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
  
  -- Create new enum type with clean values
  CREATE TYPE "public"."enum_pages_theme_config_display_mode_new" AS ENUM('icon', 'hotspot', 'list', 'image', 'window');
  
  -- Add new column with the new enum type
  ALTER TABLE "public"."pages" ADD COLUMN "theme_config_display_mode_new" "public"."enum_pages_theme_config_display_mode_new";
  
  -- Migrate data with value mapping (cast to text first, then to new enum)
  UPDATE "public"."pages" SET "theme_config_display_mode_new" = 
    CASE 
      WHEN "theme_config_display_mode"::text = 'island' THEN 'image'::"public"."enum_pages_theme_config_display_mode_new"
      WHEN "theme_config_display_mode"::text = 'windows' THEN 'window'::"public"."enum_pages_theme_config_display_mode_new"
      ELSE ("theme_config_display_mode"::text)::"public"."enum_pages_theme_config_display_mode_new"
    END;
  
  -- Drop the old column
  ALTER TABLE "public"."pages" DROP COLUMN "theme_config_display_mode";
  
  -- Rename the new column to the original name
  ALTER TABLE "public"."pages" RENAME COLUMN "theme_config_display_mode_new" TO "theme_config_display_mode";
  
  -- Drop the old enum type
  DROP TYPE "public"."enum_pages_theme_config_display_mode";
  
  -- Rename the new enum type to the original name
  ALTER TYPE "public"."enum_pages_theme_config_display_mode_new" RENAME TO "enum_pages_theme_config_display_mode";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DROP CONSTRAINT "pages_cover_image_id_media_id_fk";
  
  DROP INDEX IF EXISTS "pages_cover_image_idx";
  ALTER TABLE "pages" ALTER COLUMN "theme_config_display_mode" SET DEFAULT 'icon';
  ALTER TABLE "pages" ALTER COLUMN "theme_config_style" SET DEFAULT '{"borderColor":"#82007f","borderWidth":"3px","backgroundColor":"#ffffff","textColor":"#222222","font":"Courier New","pageDisplayStyle":"page-position-modal","backgroundImage":null}'::jsonb;
  ALTER TABLE "spaces" ALTER COLUMN "settings_theme" SET DEFAULT '{"style":{"menu":{"defaultHeight":"3.5rem","backgroundColor":"#cccccc","showNewsTicker":true,"showFooter":true},"bodyFont":"Courier New","headerFont":"Courier New","defaultPageStyles":{"borderColor":"#82007f","borderWidth":"3px","backgroundColor":"#ffffff","textColor":"#222222","font":"Courier New","pageDisplayStyle":"page-position-modal"},"accentColor":"#ffffff","defaultPageDisplayMode":"icon","hotspotSize":"25","hotspotColor":"#82007f","primaryColor":"#9333ea","bodyTextColor":"#222222","backgroundMode":"image","secondaryColor":"#c084fc","backgroundColor":"#ffffff","headerFontColor":"#222222","contentTextColor":"#222222","backgroundImageRenderMode":"background","environment":"park","showEnvironment":false}}'::jsonb;
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "cover_image_id";
  
  -- Create original enum type
  CREATE TYPE "public"."enum_pages_theme_config_display_mode_old" AS ENUM('icon', 'hotspot', 'list', 'island', 'windows');
  
  -- Add new column with the original enum type
  ALTER TABLE "public"."pages" ADD COLUMN "theme_config_display_mode_old" "public"."enum_pages_theme_config_display_mode_old";
  
  -- Migrate data back with reverse mapping (cast to text first, then to old enum)
  UPDATE "public"."pages" SET "theme_config_display_mode_old" = 
    CASE 
      WHEN "theme_config_display_mode"::text = 'image' THEN 'island'::"public"."enum_pages_theme_config_display_mode_old"
      WHEN "theme_config_display_mode"::text = 'window' THEN 'windows'::"public"."enum_pages_theme_config_display_mode_old"
      ELSE ("theme_config_display_mode"::text)::"public"."enum_pages_theme_config_display_mode_old"
    END;
  
  -- Drop the current column
  ALTER TABLE "public"."pages" DROP COLUMN "theme_config_display_mode";
  
  -- Rename the old column back
  ALTER TABLE "public"."pages" RENAME COLUMN "theme_config_display_mode_old" TO "theme_config_display_mode";
  
  -- Drop the current enum type
  DROP TYPE "public"."enum_pages_theme_config_display_mode";
  
  -- Rename the old enum type back
  ALTER TYPE "public"."enum_pages_theme_config_display_mode_old" RENAME TO "enum_pages_theme_config_display_mode";`)
}
