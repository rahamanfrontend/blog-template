

export const CATEGORY_QUERY = `*[_type == "category"]{
  _id,
  name,
  "slug": slug.current,
  "blogCount": count(*[_type == "blog" && references(^._id)])
}`;

