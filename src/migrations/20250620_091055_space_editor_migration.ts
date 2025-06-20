import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_theme_config_display_mode" AS ENUM('icon', 'hotspot', 'list', 'island', 'windows');
  ALTER TYPE "public"."enum_pages_content_type" ADD VALUE 'page' BEFORE 'blog';
  ALTER TABLE "pages" ALTER COLUMN "theme_config_position_x" SET DEFAULT 50;
  ALTER TABLE "pages" ALTER COLUMN "theme_config_position_y" SET DEFAULT 50;
  ALTER TABLE "spaces" ALTER COLUMN "settings_theme" SET DEFAULT '{"style":{"menu":{"defaultHeight":"3.5rem","backgroundColor":"#cccccc","showNewsTicker":true,"showFooter":true},"bodyFont":"Courier New","headerFont":"Courier New","defaultPageStyles":{"borderColor":"#82007f","borderWidth":"3px","backgroundColor":"#ffffff","textColor":"#222222","font":"Courier New","pageDisplayStyle":"page-position-modal"},"accentColor":"#ffffff","defaultPageDisplayMode":"icon","hotspotSize":"25","hotspotColor":"#82007f","primaryColor":"#9333ea","bodyTextColor":"#222222","backgroundMode":"image","secondaryColor":"#c084fc","backgroundColor":"#ffffff","headerFontColor":"#222222","contentTextColor":"#222222","backgroundImageRenderMode":"background","environment":"park","showEnvironment":false}}'::jsonb;
  ALTER TABLE "pages" ADD COLUMN "messages_id" integer;
  ALTER TABLE "pages" ADD COLUMN "theme_config_size_width" numeric DEFAULT 600 NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "theme_config_size_height" numeric DEFAULT 500 NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "theme_config_display_mode" "enum_pages_theme_config_display_mode" DEFAULT 'icon';
  ALTER TABLE "pages" ADD COLUMN "theme_config_style" jsonb DEFAULT '{"borderColor":"#82007f","borderWidth":"3px","backgroundColor":"#ffffff","textColor":"#222222","font":"Courier New","pageDisplayStyle":"page-position-modal","backgroundImage":null}'::jsonb;
  ALTER TABLE "spaces" ADD COLUMN "owner_id" integer NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_messages_id_chat_messages_id_fk" FOREIGN KEY ("messages_id") REFERENCES "public"."chat_messages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "spaces" ADD CONSTRAINT "spaces_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_messages_idx" ON "pages" USING btree ("messages_id");
  CREATE INDEX IF NOT EXISTS "spaces_owner_idx" ON "spaces" USING btree ("owner_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DROP CONSTRAINT "pages_messages_id_chat_messages_id_fk";
  
  ALTER TABLE "spaces" DROP CONSTRAINT "spaces_owner_id_users_id_fk";
  
  DROP INDEX IF EXISTS "pages_messages_idx";
  DROP INDEX IF EXISTS "spaces_owner_idx";
  ALTER TABLE "pages" ALTER COLUMN "theme_config_position_x" DROP DEFAULT;
  ALTER TABLE "pages" ALTER COLUMN "theme_config_position_y" DROP DEFAULT;
  ALTER TABLE "spaces" ALTER COLUMN "settings_theme" SET DEFAULT '{"style":{"menu":{"defaultHeight":"3.5rem","backgroundColor":"#ccc","showNewsTicker":true},"bodyFont":"Courier New","headerFont":"Courier New","pageStyles":{"width":"50%","height":"70vh","borderColor":"purple","borderWidth":"3px","displayStyle":"center-modal","backgroundColor":"#fff"},"accentColor":"purple","displayMode":"icons","hotspotSize":"15","hotspotColor":"purple","primaryColor":"#9333ea","bodyTextColor":"#222","backgroundMode":"color","secondaryColor":"#c084fc","backgroundColor":"#fff","headerFontColor":"#222","contentTextColor":"#222","backgroundImageRenderMode":"center","environment":"park"}}'::jsonb;
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "messages_id";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "theme_config_size_width";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "theme_config_size_height";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "theme_config_display_mode";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "theme_config_style";
  ALTER TABLE "spaces" DROP COLUMN IF EXISTS "owner_id";
  ALTER TABLE "public"."pages" ALTER COLUMN "content_type" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_content_type";
  CREATE TYPE "public"."enum_pages_content_type" AS ENUM('blog', 'files', 'chatbot', 'chat-messages', 'products');
  ALTER TABLE "public"."pages" ALTER COLUMN "content_type" SET DATA TYPE "public"."enum_pages_content_type" USING "content_type"::"public"."enum_pages_content_type";
  DROP TYPE "public"."enum_pages_theme_config_display_mode";`)
}
