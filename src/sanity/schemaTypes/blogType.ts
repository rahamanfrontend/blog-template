import { defineField, defineType } from "sanity";

export default defineType({
   name: "blog",
   title: "Blog",
   type: "document",
   fields: [
      defineField({
         name: "title",
         title: "Title",
         type: "string",
         description: "Title of the blog post",
      }),
      defineField({
         name: "slug",
         title: "Slug",
         type: "slug",
         options: {
            source: "title",
            maxLength: 200,
            slugify: (input) =>
               input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
         },
         validation: (Rule) =>
            Rule.required().custom(async (slug, context) => {
               // Check if slug exists and has current property
               if (!slug?.current) {
                  return "Slug is required";
               }

               const { document, getClient } = context;
               const client = getClient({ apiVersion: "2023-01-01" });

               // Handle both draft and published document IDs
               const id = document?._id?.replace(/^drafts\./, "") || "";

               try {
                  // Query to check for existing slugs, excluding current document
                  const existing = await client.fetch(
                     `*[_type == "blog" && slug.current == $slug && !(_id in [$draftId, $publishedId])][0]`,
                     {
                        slug: slug.current,
                        draftId: `drafts.${id}`,
                        publishedId: id,
                     }
                  );

                  return existing
                     ? "This slug is already in use. Please choose a different one."
                     : true;
               } catch (error) {
                  console.error("Slug validation error:", error);
                  return "Unable to validate slug uniqueness. Please try again.";
               }
            }),
         description: "Unique URL slug for the blog post",
      }),
      defineField({
         name: "subtitle",
         title: "Subtitle",
         type: "string",
         description: "Subtitle of the blog post",
      }),
      defineField({
         name: "featureImg",
         title: "Feature Image",
         type: "image",
         options: {
            hotspot: true,
         },
         description: "Featured image for the blog post",
      }),
      defineField({
         name: "date",
         title: "Date",
         type: "date",
         description: "Publish date of the blog post",
      }),
      defineField({
         name: "category",
         title: "Category",
         type: "reference",
         to: [{ type: "category" }],
         description: "Category of the blog post",
      }),
      defineField({
         name: "post_views",
         title: "Post Views",
         type: "number",
         description: "Number of views for the blog post",
      }),
      defineField({
         name: "read_time",
         title: "Read Time",
         type: "number",
         description: "Estimated time to read the blog post",
      }),
      defineField({
         name: "author",
         title: "Author",
         type: "reference",
         to: [{ type: "author" }],
         description: "Author of the blog post",
      }),
      defineField({
         name: "tags",
         title: "Tags",
         type: "array",
         of: [{ type: "reference", to: [{ type: "tag" }] }],
         description: "Tags associated with the blog post",
      }),
      defineField({
         name: "seo_description",
         title: "SEO Description",
         type: "string",
         description: "SEO description for the blog post",
      }),
      defineField({
         name: "seo_keywords",
         title: "SEO Keywords",
         type: "array",
         of: [{ type: "string" }],
         description: "SEO keywords for the blog post",
      }),
      defineField({
         name: "content",
         title: "Content",
         type: "array",
         of: [
            { type: "block" },
            {
               type: "image",
               options: { hotspot: true }, // Allows cropping and focusing
               fields: [
                  {
                     name: "alt",
                     title: "Alt Text",
                     type: "string",
                     description: "Alternative text for accessibility and SEO",
                  },
                  {
                     name: "caption",
                     title: "Caption",
                     type: "string",
                     description: "Optional caption for the image",
                  },
               ],
            },
         ],
      }),
   ],
});
