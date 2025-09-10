import { client } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";

import BlogSwiper from "./blog-swiper";
const BLOG_QUERY = `*[
  _type == "blog" && 
  category->name == $categoryName &&
  _id != $currentBlogId
]{
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
    username
  },
  "tags": tags[]->title,
  seo_description,
  seo_keywords
}`;

const ServerSideBlogGroup = async ({
   categoryName,
   currentBlogId,
}: {
   categoryName: string;
   currentBlogId: string;
}) => {
   const options = { next: { revalidate: 30 } };

   const allPosts = await client.fetch<SanityDocument[]>(
      BLOG_QUERY,
      {
         categoryName,
         currentBlogId,
      },
      options
   );

   return (
      <div className="!relative mx-auto mb-20 max-w-7xl  ">
         {allPosts?.length > 0 && <BlogSwiper allPosts={allPosts} />}
      </div>
   );
};

export default ServerSideBlogGroup;
