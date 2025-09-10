import { client } from '@/sanity/lib/client'
import { SanityDocument } from 'next-sanity'

const options = { next: { revalidate: 30 } }

const TAGS_QUERY = `*[_type == "tag"]{
  _id,
  name,
  "slug": slug.current,
  "blogCount": count(*[_type == "blog" && references(^._id)])
}
`

export const getAllTags = async () => {
  const allTags = await client.fetch<SanityDocument[]>(TAGS_QUERY, {}, options)
  return allTags
}
