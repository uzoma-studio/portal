import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'mediaType',
      type: 'text',
    },
    {
      name: 'imageType',
      type: 'select',
      options: [
        { label: 'Background Image', value: 'background' },
        { label: 'Space Image', value: 'spaceImage' },
      ],
    },
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
              admin: {
                description: 'X coordinate (0-100)',
                width: '50%'
              },
            },
            {
              name: 'y',
              type: 'number',
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
                admin: {
                  description: 'Page width in px',
                  width: '50%'
                },
              },
              {
                name: 'height',
                type: 'number',
                admin: {
                  description: 'Page height in px',
                  width: '50%'
                },
              },
            ],
          }
        ]
    },
  ],
  upload: true,
}
