import * as migration_20250504_104541_initial_migration from './20250504_104541_initial_migration';
import * as migration_20250604_130832_multi_tenancy_migration from './20250604_130832_multi_tenancy_migration';
import * as migration_20250605_192320_adds_space_id_to_news_ticker from './20250605_192320_adds_space_id_to_news_ticker';
import * as migration_20250620_091055_space_editor_migration from './20250620_091055_space_editor_migration';
import * as migration_20250626_204043_adds_columns_to_pages from './20250626_204043_adds_columns_to_pages';

export const migrations = [
  {
    up: migration_20250504_104541_initial_migration.up,
    down: migration_20250504_104541_initial_migration.down,
    name: '20250504_104541_initial_migration',
  },
  {
    up: migration_20250604_130832_multi_tenancy_migration.up,
    down: migration_20250604_130832_multi_tenancy_migration.down,
    name: '20250604_130832_multi_tenancy_migration',
  },
  {
    up: migration_20250605_192320_adds_space_id_to_news_ticker.up,
    down: migration_20250605_192320_adds_space_id_to_news_ticker.down,
    name: '20250605_192320_adds_space_id_to_news_ticker',
  },
  {
    up: migration_20250620_091055_space_editor_migration.up,
    down: migration_20250620_091055_space_editor_migration.down,
    name: '20250620_091055_space_editor_migration',
  },
  {
    up: migration_20250626_204043_adds_columns_to_pages.up,
    down: migration_20250626_204043_adds_columns_to_pages.down,
    name: './20250626_204043_adds_columns_to_pages'
  },
];
