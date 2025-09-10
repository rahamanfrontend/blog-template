import { defineType, defineField } from "sanity";


export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      description: 'Name of the category',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 200,
        slugify: input =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: Rule =>
        Rule.required().custom(async (slug, context) => {
          if (!slug?.current) {
            return 'Slug is required'
          }
          const { document, getClient } = context
          const client = getClient({ apiVersion: '2023-01-01' })

          const existing = await client.fetch(
            `*[_type == "category" && slug.current == $slug && _id != $docId][0]`,
            { slug: slug.current, docId: document?._id },
          )

          return existing
            ? 'This slug is already in use. Please choose a different one.'
            : true
        }),
      description: 'Unique URL slug for the category',
    }),
    defineField({
      name: 'blogs',
      title: 'Blogs',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blog' }] }],
      description: 'List of blogs associated with this category',
    }),
  ],
})
