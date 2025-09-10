export const POSTS_QUERY = `*[_type == "blog"] | order(createdBy desc){
  _id,
  title,
  slug,
  subtitle,
  "featureImg": featureImg.asset->url,
  date,
  "category": category->{
    name,
    _id
  },

  post_views,
  read_time,
  "author": author->{
    author_name,
    "author_img": author_img.asset->url,
    "socialMedia": socialMedia->{
      facebook,
      instagram,
      linkedin,
      youtube    
    },
    author_url,
    author_designation,
    author_info,
    author_bio
  },
  "tags": tags[]->name,
  seo_description,
  seo_keywords,
}`;
