/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Tag Name',
      type: 'string',
      description: 'Name of the tag',
      validation: Rule =>
        Rule.required().custom(async (name, context) => {
          const { document, getClient } = context
          const client = getClient({ apiVersion: '2024-02-04' })

          const existingTags = await client.fetch(
            `*[_type == "tag" && name == $name && _id != $id][0]`,
            // @ts-ignore
            { name, id: document._id },
          )

          return existingTags ? 'Tag name must be unique' : true
        }),
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
          const { document, getClient } = context
          const client = getClient({ apiVersion: '2024-02-04' })

          const existingSlugs = await client.fetch(
            `*[_type == "tag" && slug.current == $slug && _id != $id][0]`,
            // @ts-ignore
            { slug: slug?.current, id: document._id }
          );

          return existingSlugs ? 'Slug must be unique' : true
        }),
    }),
    defineField({
      name: 'blogs',
      title: 'Blogs',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blog' }] }],
      description: 'List of blogs associated with this tag',
    }),
  ],
})
