/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import IcoSearch from "../../__icons/ico-search";
import blogImg from "../../__assets/blog-banner.webp";
import Head from "../../__components/Head";
import { Input } from "../../__components/ui/input";
import { Typography } from "../../__components/ui/Typography";
import { cn } from "../../_libs/utils";
import { notFound } from "next/navigation";

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
import IcoClear from "../../__icons/ico-clear";

import Loader from "../../__components/Loader";
import BlogCard from "../../__components/blog-card";
import { blogFontConfig } from "../../__configs/font";
import { siteInfo } from "../../__configs/siteInfo";
import { TAG_BLOG_QUERY, TAGS_QUERY } from "./queries";

const TagBlogs = ({ params }: { params: { slug: string } }) => {
   const [searchString, setSearchString] = useState("");
   const [tagSlug, setTagSlug] = useState(params?.slug);
   const [allTags, setAllTags] = useState<SanityDocument[]>([]);
   const [selectedTag, setSelectedTag] = useState("");
   const [loader, setLoader] = useState(false);
   const [tagNotFound, setTagNotFound] = useState(false);
   const [querySearchQuery, setSearchQuery] = useState(TAG_BLOG_QUERY);

   const options = { next: { revalidate: 30 } };

   const [posts, setPosts] = useState<SanityDocument[]>([]);

   // Debounce search string with 500ms delay
   const debouncedSearchString = useDebounce(searchString, 500);

   console.log({
      tagPosts: allTags,
   });

   console.log({ my_post: posts });

   useEffect(() => {
      setLoader(true);
      client
         .fetch<SanityDocument[]>(
            querySearchQuery,
            {
               searchTerm: debouncedSearchString,
               tagSlug,
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
   }, [debouncedSearchString, tagSlug, querySearchQuery]);

   useEffect(() => {
      setLoader(true);
      setTagNotFound(false);
      client
         .fetch<SanityDocument[]>(TAGS_QUERY, {}, options)
         .then((value) => {
            console.log(value);
            if (!value[0]) {
               setTagNotFound(true);
               setAllTags([]);
            } else {
               setAllTags(value);
            }
            setLoader(false);
         })
         .catch((err) => {
            console.log(err);
            setAllTags([]);
            setLoader(false);
            setTagNotFound(true);
         });
   }, []);

   useEffect(() => {
      if (allTags?.length > 0) {
         const tag = allTags?.find((item) => item?.slug === tagSlug);
         if (!tag) {
            setTagNotFound(true);
         } else {
            setSelectedTag(tag?.name as string);
         }
      }
   }, [tagSlug, allTags?.length]);

   if (tagNotFound) {
      return notFound();
   }

   return (
      <div>
         <Head
            bgImg={blogImg}
            heading={selectedTag || "Tags"}
            subHeading="Blogs"
            children_heading={selectedTag || "Tags"}
         />

         {/* Header Section Blog */}
         <div className="px-4 py-16 md:px-[52px] md:py-20 md:!pb-8">
            <div className="flex flex-col items-center justify-center gap-4">
               <Typography
                  variant="Medium_H2"
                  className={cn(
                     blogFontConfig.title,
                     `capitalize text-dark_blue_ text-center`
                  )}
               >
                  {selectedTag || "Tags"}
               </Typography>
               <Typography
                  variant="Regular_H6"
                  className={cn(
                     blogFontConfig.subtitle,
                     `text-blog-dark_gray text-center`
                  )}
               >
                  {siteInfo.description}
               </Typography>
               <div className="relative mt-4 w-full max-w-[400px]  md:!px-0">
                  <Input
                     className="w-full rounded-[4px] px-[14px] py-3 pr-10 placeholder:text-light_gray focus:!outline-primary focus-visible:!outline-primary"
                     placeholder="Search yoga tips, poses, or articles..."
                     value={searchString}
                     onChange={(e) => setSearchString(e.target.value)}
                  />
                  {searchString ? (
                     <IcoClear
                        className="absolute right-8 top-1/2 -translate-y-1/2 cursor-pointer md:right-4"
                        onClick={() => {
                           setSearchString("");
                        }}
                     />
                  ) : (
                     <IcoSearch className="absolute right-8 top-1/2 -translate-y-1/2 text-blog-primary md:right-4" />
                  )}
               </div>
            </div>
         </div>

         <div className="mx-auto mb-12 flex w-full flex-wrap items-center justify-center gap-3 px-4 md:mb-16 md:w-5/6 lg:w-3/4">
            {allTags?.map((item, index) => (
               <Typography
                  key={index}
                  variant="Regular_H6"
                  className={cn(
                     `cursor-pointer rounded-full capitalize !bg-blog-primary/10 px-4 py-2 !text-blog-primary text-sm md:text-base`,
                     tagSlug === item?.slug && "!bg-blog-primary !text-white"
                  )}
                  onClick={() => setTagSlug(item?.slug as string)}
               >
                  {/* @ts-ignore */}
                  {item?.name as string} {"  "} ({item?.blogCount})
               </Typography>
            ))}
         </div>

         {loader ? (
            <div className="flex justify-center">
               <Loader />
            </div>
         ) : (
            <div className="!relative mx-auto mb-20 grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 lg:px-8">
               {posts.map((item, index) => (
                  <BlogCard data={item} key={index} />
               ))}
            </div>
         )}

         {!loader && posts?.length < 1 && (
            <Typography
               variant="Medium_H4"
               className={cn(
                  "block pb-7 text-center text-2xl md:text-[31px]",
                  blogFontConfig.title
               )}
            >
               No blog found
            </Typography>
         )}
      </div>
   );
};

export default TagBlogs;
