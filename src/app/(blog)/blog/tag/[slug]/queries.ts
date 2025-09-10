export const TAG_BLOG_QUERY = `*[
  _type == "blog" && 
  (
    title match $searchTerm + "*" ||
    $searchTerm in tags[]->name
  ) &&
  $tagSlug in tags[]->slug.current
] | order(_createdAt desc) {
  _id,
  title,
  slug,
  subtitle,
  "featureImg": featureImg.asset->url,
  date,
  "category": category->{
    name,
    _id,
    "slug": slug.current
  },
  post_views,
  read_time,
  "author": author->{
    author_name,
    "author_img": author_img.asset->url,
    username
  },
  "tags": tags[]->{
    name,  
    "slug": slug.current
  },
  seo_description,
  seo_keywords,
}`;


export const TAGS_QUERY = `*[_type == "tag"]{
  _id,
  name,
  "slug": slug.current,
  "blogCount": count(*[_type == "blog" && references(^._id)])
}
`;