export const query = `*[_type == "blog" && slug.current == $slug][0]{
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
     socialMedia,
     author_url,
    author_designation,
    author_info,
    author_bio,
    username
  },
  "tags": tags[]->{
  name,
  "slug": slug.current
  },
  seo_description,
  seo_keywords,
  content
}`;


export const POSTS_QUERY = `*[_type == "blog"] | order(createdBy desc){
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
    author_url,
    author_designation,
    author_info,
    author_bio,
    username
  },
  "tags": tags[]->{
    name,
    "slug": slug.current
  },
  seo_description,
  seo_keywords,
}`;