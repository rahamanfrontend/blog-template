export const AUTHOR_QUERY = `*[_type == "author" && username == $username] {
  _id,
  author_name,
  username,
  "author_img": author_img.asset->url,
  author_designation,
  author_info,
  author_bio,
  author_url,
  socialMedia {
    facebook,
    youtube,
    instagram,
    linkedin
  }
}
`; 


export const AUTHOR_BLOGS_QUERY= `*[
  _type == "blog" && 
  title match $searchTerm + "*" &&
  author->username == $authorUsername
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
    author_designation,
    author_info, 
    author_bio,
    "author_img": author_img.asset->url,
   socialMedia,
    username
  },
  "tags": tags[]->{
    name,  
    "slug": slug.current
  },
  seo_description,
  seo_keywords,
}
`