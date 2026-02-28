// storage-adapter-import-placeholder
//@ts-nocheck
import { s3Storage } from '@payloadcms/storage-s3'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { SiteSettings } from './collections/Settings'
import { Posts } from './collections/Posts'
import { NewsTicker } from './collections/NewsTicker'
import { Chatbot } from './collections/Chatbot'
import { ChatMessages } from './collections/ChatMessages'
import { Products } from './collections/Products'
import { Subscriptions } from './collections/Subscriptions'
import { ThemeSettings } from './collections/ThemeSettings'
import { Spaces } from './collections/Spaces'
import { SpaceMemberships } from './collections/SpaceMembers'
import { Icons } from './collections/Icons'
import { Updates } from './collections/Updates'
import { ProductImages } from './collections/ProductImages'
import { FeaturedSpaces } from './collections/FeaturedSpaces'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    {
      ...Media,
      admin: {
        group: 'Content',
      },
    },
    {
      ...Pages,
      admin: {
        group: 'Content',
      },
    },
    {
      ...Updates,
      admin: {
        group: 'Content',
      },
    },
    {
      ...Posts,
      admin: {
        group: 'Content Types',
      },
    },
    {
      ...Chatbot,
      admin: {
        group: 'Content Types',
      },
    },
    {
      ...ChatMessages,
      admin: {
        group: 'Content Types'
      }
    },
    {
      ...Products,
      admin: {
        group: 'Content Types'
      }
    },
    {
      ...NewsTicker,
      admin: {
        group: 'Widgets'
      }
    },
    {
      ...Subscriptions,
      admin: {
        group: 'Payments'
      }
    },
    {
      ...Users,
      admin: {
        group: 'Users & Permissions',
      },
    },
    {
      ...Spaces,
      admin: {
        group: 'Settings',
      },
    },
    {
      ...FeaturedSpaces,
      admin: {
        group: 'Settings',
      },
    },
    {
      ...SpaceMemberships,
      admin: {
        group: 'Settings',
      },
    },
    {
      ...SiteSettings,
      admin: {
        group: 'Settings',
      },
    },
    {
      ...Icons,
      admin: {
        group: 'Settings',
      },
    },
    {
      ...ProductImages,
      admin: {
        group: 'Content',
      },
    },
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
        icons: true,
        productImages: true,
      },
      bucket: process.env.S3_BUCKET,
      config: {
        credentials: {
          forcePathStyle: true,
          accessKeyId: process.env.S3_ACCESS_KEY_ID,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
        endpoint: process.env.S3_ENDPOINT,
        region: 'auto',
        clientUploads: true,
      },
    }),
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
