/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import IcoSearch from "../__icons/ico-search";
import blogImg from "../__assets/blog-banner.webp";
import Head from "../__components/Head";
import { Input } from "../__components/ui/input";
import { Typography } from "../__components/ui/Typography";
import { cn } from "../_libs/utils";

import { useEffect, useState } from "react";

import { client } from "@/sanity/lib/client";
import { SanityDocument } from "sanity";
import { useDebounce } from "@/hooks/useDebounce";

//  React swiper **
// Import Swiper React components

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import Loader from "../__components/Loader";
import BlogCard from "../__components/blog-card";
import { blogFontConfig } from "../__configs/font";

const TrimukBlog = () => {
   const [searchString, setSearchString] = useState("");
   const [loader, setLoader] = useState(false);
   const [querySearchQuery, setSearchQuery] = useState(`*[
  _type == "blog" && 
  (
    title match $searchTerm + "*"
  )
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
    "slug":  slug.current
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
}`);

   const options = { next: { revalidate: 30 } };

   const [posts, setPosts] = useState<SanityDocument[]>([]);

   // Debounce search string with 500ms delay
   const debouncedSearchString = useDebounce(searchString, 500);

   console.log({ my_post: posts });

   useEffect(() => {
      setLoader(true);
      client
         .fetch<SanityDocument[]>(
            querySearchQuery,
            {
               searchTerm: debouncedSearchString,
            },
            options
         )
         .then((value) => {
            console.log(value);
            setPosts(value);
            setLoader(false);
         })
         .catch((err) => {
            console.log(err);
            setPosts([]);
            setLoader(false);
         });
   }, [debouncedSearchString, querySearchQuery]);

   return (
      <div>
         <Head bgImg={blogImg} heading="Recent Articles" subHeading="Blogs" />

         {/* Header Section Blog */}
         <div className="px-[52px] py-20 !pb-14">
            <div className="flex flex-col items-center justify-center gap-4">
               <Typography
                  variant="Medium_H2"
                  className={cn(blogFontConfig.title, `text-dark_blue_`)}
               >
                  Recent Articles
               </Typography>
               <Typography
                  variant="Regular_H6"
                  className={cn(blogFontConfig.subtitle, `text-blog-dark_gray`)}
               >
                  Discover yoga, wellness, and mindful living with inspiring
                  insights and practical tips.
               </Typography>
               <div className="mb- relative mt-4">
                  <Input
                     className="w-3/5 rounded-[4px] px-[14px] py-3 placeholder:text-light_gray focus:!outline-primary  focus-visible:!outline-primary  md:w-[400px]"
                     placeholder="Search yoga tips, poses, or articles..."
                     value={searchString}
                     onChange={(e) => setSearchString(e.target.value)}
                  />
                  <IcoSearch className="absolute right-4  text-blog-primary top-1/2 -translate-y-1/2" />
               </div>
            </div>
         </div>
         {loader ? (
            <div>
               <Loader />
            </div>
         ) : (!loader && posts?.length) < 1 ? (
            <Typography
               variant="Medium_H4"
               className={cn(
                  "block pb-7 text-center text-[31px]",
                  blogFontConfig.title
               )}
            >
               No blog found
            </Typography>
         ) : (
            <div className="!relative mx-auto mb-20 grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-3 lg:px-8 ">
               {posts.map((item, index) => (
                  <BlogCard data={item} key={index} />
               ))}
            </div>
         )}
      </div>
   );
};

export default TrimukBlog;
