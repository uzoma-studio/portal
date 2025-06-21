import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { generateSlug } from '../utils/helpers';
import themeSettings from '../../themeSettings.json';

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
        name: 'body',
        type: 'richText',
        editor: lexicalEditor()
    },
    {
        name: 'slug',
        type: 'text',
        required: true,
        unique: true,
        admin: {
          position: 'sidebar',
        },
    },
    {
        name: 'contentType',
        type: 'select',
        options: [
            { label: 'Page', value: 'page' },
            { label: 'Blog', value: 'blog' },
            { label: 'Files', value: 'files' },
            { label: 'Chatbot', value: 'chatbot' },
            { label: 'Chat', value: 'chat-messages' },
            { label: 'Shop', value: 'products' },
        ],
    },
    {
      name: 'chatbot',
      type: 'relationship',
      relationTo: 'chatbot',
      admin: {
        condition: (_, { contentType }) => contentType === 'chatbot',
      },
    },
    {
      name: 'messages',
      type: 'relationship',
      relationTo: 'chat-messages',
      admin: {
        condition: (_, { contentType }) => contentType === 'chat-messages',
      },
    },
    {
      name: 'updates',
      type: 'relationship',
      relationTo: 'updates',
      hasMany: true,
      admin: {
        description: 'Updates for this blog page',
        condition: (_, { contentType }) => contentType === 'blog',
      },
    },
    {
      name: 'space',
      type: 'relationship',
      relationTo: 'spaces',
      required: true,
      hasMany: false,
      index: true,
      admin: {
        description: 'Select the space this page belongs to',
      },
    },
    {
      name: 'themeConfig',
      type: 'group',
      fields: [
        {
          name: 'position',
          type: 'group',
          fields: [
            {
              type: 'row',
                fields: [
                {
                  name: 'x',
                  type: 'number',
                  required: true,
                  min: 0,
                  max: 100,
                  defaultValue: 50,
                  admin: {
                    description: 'X coordinate (0-100)',
                    width: '50%'
                  },
                },
                {
                  name: 'y',
                  type: 'number',
                  required: true,
                  min: 0,
                  max: 100,
                  defaultValue: 50,
                  admin: {
                    description: 'Y coordinate (0-100)',
                    width: '50%'
                  },
                },
              ],
            }
          ]
        },
        {
          name: 'size',
          type: 'group',
          fields: [
            {
              type: 'row',
                fields: [
                  {
                    name: 'width',
                    type: 'number',
                    required: true,
                    defaultValue: 600,
                    admin: {
                      description: 'Page width in px',
                      width: '50%'
                    },
                  },
                  {
                    name: 'height',
                    type: 'number',
                    required: true,
                    defaultValue: 500,
                    admin: {
                      description: 'Page height in px',
                      width: '50%'
                    },
                  },
                ],
              }
            ]
        },
        {
          name: 'displayMode',
          type: 'select',
          options: [
            { label: 'Icon', value: 'icon' },
            { label: 'Hotspot', value: 'hotspot' },
            { label: 'List', value: 'list' },
            { label: 'Island', value: 'island' },
            { label: 'Window', value: 'windows' },
          ],
          admin: {
            description: 'Choose how the page will show up in your space',
          },
          defaultValue: themeSettings.style.defaultPageDisplayMode
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'icons',
          admin: {
            description: 'Optional icon image for the page',
          },
        },
        {
          name: 'hotspotName',
          type: 'text',
          admin: {
            description: 'Optional name to display on the hotspot',
          },
        },
        {
          name: 'style',
          type: 'json',
          defaultValue: {
            ...themeSettings.style.defaultPageStyles,
            "backgroundImage": null,
          }
        }
  ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        // Only generate slug if title exists and it's a create operation or title is being updated
        if (data.title && (operation === 'create' || (req.body && 'title' in req.body))) {
          // Generate base slug from title
          let slug = generateSlug(data.title);
          
          // Check if the slug already exists
          const existingPages = await req.payload.find({
            collection: 'pages',
            where: {
              slug: {
                equals: slug,
              },
            },
          });
          
          // If slug exists, append a number
          if (existingPages.totalDocs > 0) {
            let counter = 1;
            let newSlug = `${slug}-${counter}`;
            
            while (true) {
              const checkSlug = await req.payload.find({
                collection: 'pages',
                where: {
                  slug: {
                    equals: newSlug,
                  }
                },
              });
              
              if (checkSlug.totalDocs === 0) break;
              counter++;
              newSlug = `${slug}-${counter}`;
            }
            
            slug = newSlug;
          }
          
          data.slug = slug;
        }
        
        return data;
      },
    ],
  },
}