/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import IcoDoubleArrowRight from "../__icons/ico-double-arrow";

import { Typography } from "./ui/Typography";
import { cn } from "../_libs/utils";
import { client } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { blogFontConfig } from "../__configs/font";

const RelatedBlogs = ({
   categoryName,
   currentBlogId,
}: {
   categoryName: string;
   currentBlogId: string;
}) => {
   const [query, setQuery] = useState(`*[
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
}
`);

   console.log(query);
   const options = { next: { revalidate: 30 } };

   const [posts, setPosts] = useState<SanityDocument[]>([]);
   const router = useRouter();

   useEffect(() => {
      client
         .fetch<SanityDocument[]>(
            query,
            {
               categoryName: categoryName,
               currentBlogId,
            },
            options
         )
         .then((value) => {
            console.log(value);
            setPosts(value);
         })
         .catch((err) => {
            console.log(err);
            setPosts([]);
         });
   }, [query, categoryName, currentBlogId]);

   return (
      <div className="w-full cursor-pointer rounded-2xl border border-[#E4E4E7] bg-[#FAFAFA] px-4 sm:px-6 py-6 sm:py-8 lg:w-[445px]">
         <Typography
            variant="Medium_H4"
            className={cn(
               blogFontConfig.title,
               "mb-6 block font-medium text-blog-gray_1"
            )}
         >
            Related Blogs & Articles
         </Typography>
         <div className="flex !w-full flex-col gap-3">
            {posts?.map((item, key) => (
               <div
                  key={key}
                  onClick={() => {
                     router.push(`/blog/${item?.slug?.current}`);
                  }}
                  className="group flex !w-full items-center justify-between gap-2 rounded-xl border border-[#E4E4E7] bg-[#FFFFFF] px-3 sm:px-4 py-2 sm:py-3"
               >
                  <Typography
                     variant="Regular_H6"
                     className={cn(
                        blogFontConfig.subtitle,
                        "line-clamp-2 text-blog-accent group-hover:!text-blog-primary lg:!w-auto text-sm sm:text-base"
                     )}
                  >
                     {item?.title}
                  </Typography>
                  <div className="size-4 sm:size-5">
                     <IcoDoubleArrowRight className="text-blog-primary group-hover:text-blog-primary" />
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default RelatedBlogs;
