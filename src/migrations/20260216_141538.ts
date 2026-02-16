import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ALTER COLUMN "theme_config_display_mode" SET DEFAULT 'none';
  ALTER TABLE "spaces" ALTER COLUMN "settings_theme" SET DEFAULT '{"style":{"menu":{"defaultHeight":"3.5rem","backgroundColor":"#cccccc","showNewsTicker":true,"showFooter":true},"bodyFont":"Courier New","headerFont":"Courier New","defaultPageStyles":{"borderWidth":"3px","backgroundColor":"#ffffff","textColor":"#222222","pageDisplayStyle":"center-modal"},"accentColor":"#ffffff","defaultPageDisplayMode":"none","hotspotSize":"25","hotspotColor":"#82007f","primaryColor":"#9333ea","bodyTextColor":"#222222","backgroundMode":"image","secondaryColor":"#c084fc","backgroundColor":"#ffffff","headerTextColor":"#222222","contentTextColor":"#222222","backgroundImageRenderMode":"background","environment":"park","showEnvironment":false}}'::jsonb;
  ALTER TABLE "spaces" ADD COLUMN "texts" jsonb DEFAULT '[]'::jsonb;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ALTER COLUMN "theme_config_display_mode" SET DEFAULT 'hotspot';
  ALTER TABLE "spaces" ALTER COLUMN "settings_theme" SET DEFAULT '{"style":{"menu":{"defaultHeight":"3.5rem","backgroundColor":"#cccccc","showNewsTicker":true,"showFooter":true},"bodyFont":"Courier New","headerFont":"Courier New","defaultPageStyles":{"borderWidth":"3px","backgroundColor":"#ffffff","textColor":"#222222","pageDisplayStyle":"center-modal"},"accentColor":"#ffffff","defaultPageDisplayMode":"hotspot","hotspotSize":"25","hotspotColor":"#82007f","primaryColor":"#9333ea","bodyTextColor":"#222222","backgroundMode":"image","secondaryColor":"#c084fc","backgroundColor":"#ffffff","headerTextColor":"#222222","contentTextColor":"#222222","backgroundImageRenderMode":"background","environment":"park","showEnvironment":false}}'::jsonb;
  ALTER TABLE "spaces" DROP COLUMN IF EXISTS "texts";`)
}
