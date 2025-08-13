import { CollectionConfig } from 'payload';
import themeSettings from '../../themeSettings.json';

export const Spaces: CollectionConfig = {
  slug: 'spaces',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'domain',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'settings',
      type: 'group',
      fields: [
        {
          name: 'siteTitle',
          type: 'text',
        },
        {
          name: 'siteDescription',
          type: 'text',
        },
        {
            name: 'backgroundImage',
            type: 'upload',
            relationTo: 'media',
        },
        {
          name: 'theme',
          type: 'json',
          defaultValue: themeSettings
        }
      ]
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        description: 'Select the user who owns this space',
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Images',
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media', // the slug of your Media collection
          required: true,
        },
        {
          name: 'size',
          type: 'group',
          fields: [
            { name: 'width', type: 'number' },
            { name: 'height', type: 'number' },
          ],
        },
        {
          name: 'position',
          type: 'group',
          fields: [
            { name: 'x', type: 'number' },
            { name: 'y', type: 'number' },
          ],
        },
      ],
    },
  ],
}; 