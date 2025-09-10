import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'instagramPost',
  title: 'Instagram Post',
  type: 'document',
  fields: [
    defineField({
      name: 'postUrl',
      title: 'Instagram Post URL',
      type: 'url',
      description: 'The direct link to the Instagram post',
      validation: Rule => Rule.uri({ scheme: ['http', 'https'] }).required(),
    }),
    defineField({
      name: 'postImg',
      title: 'Post Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'PostImage image for the blog post',
      validation: Rule => Rule.required(),
    }),
  ],
})
