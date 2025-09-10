import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'author_name',
      title: 'Author Name',
      type: 'string',
      description: 'The name of the author',
    }),
    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
      description: 'Unique username without spaces',
      validation: Rule =>
        Rule.required().custom(username => {
          if (!username) return true
          if (/\s/.test(username)) return 'Username cannot contain spaces'
          return true
        }),
    }),
    defineField({
      name: 'author_img',
      title: 'Author Image',
      type: 'image',
      description: 'Image of the author',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'author_designation',
      title: 'Author Designation',
      type: 'string',
      description: 'The designation or role of the author',
    }),
    defineField({
      name: 'author_info',
      title: 'Author Info',
      type: 'text',
      description: 'A short description of the author',
    }),
    defineField({
      name: 'author_bio',
      title: 'Author Bio',
      type: 'text',
      description: 'The author’s biography',
    }),
    defineField({
      name: 'author_url',
      title: 'Author URL',
      type: 'url',
      description: 'Link to the author’s blog or website',
    }),
    // defineField({
    //   name: 'author_social',
    //   title: 'Author Social Links',
    //   type: 'array',
    //   of: [
    //     {
    //       name: 'social_link',
    //       type: 'object',
    //       fields: [
    //         defineField({
    //           name: 'icon',
    //           title: 'Social Media Icon',
    //           type: 'string',
    //           description:
    //             'FontAwesome icon class for the social media platform',
    //         }),
    //         defineField({
    //           name: 'url',
    //           title: 'Social Media URL',
    //           type: 'url',
    //           description: 'Link to the author’s social media profile',
    //         }),
    //       ],
    //     },
    //   ],
    //   description: 'Social media links of the author',
    // }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        }),
        defineField({
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        }),
        defineField({
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
        }),
      ],
      description: 'Social media links for the author',
    }),
  ],
})
