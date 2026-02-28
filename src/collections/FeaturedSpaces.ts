import { CollectionConfig } from 'payload'

export const FeaturedSpaces: CollectionConfig = {
  slug: 'featured-spaces',
  admin: {
    useAsTitle: 'Featured Spaces',
    defaultColumns: ['spaces'],
  },
  fields: [
    {
      name: 'spaces',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'space',
          type: 'relationship',
          relationTo: 'spaces',
          required: true,
          admin: {
            width: '100%',
          },
        }
      ],
    },
  ],
}
