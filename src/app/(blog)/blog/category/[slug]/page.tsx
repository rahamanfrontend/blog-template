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

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import IcoClear from "../../__icons/ico-clear";
import Loader from "../../__components/Loader";
import BlogCard from "../../__components/blog-card";
import { blogFontConfig } from "../../__configs/font";
import { siteInfo } from "../../__configs/siteInfo";
import { CATEGORY_BLOG_QUERY, CATEGORY_QUERY, RECENT_QUERY } from "../queris";

const CategoryBlogs = ({ params }: { params: { slug: string } }) => {
   const [searchString, setSearchString] = useState("");
   const [categorySlug, setCategorySlug] = useState(params?.slug);
   const [category, setCategory] = useState<SanityDocument[]>([]);
   const [loader, setLoader] = useState(false);
   const [categoryNotFound, setCategoryNotFound] = useState(false);
   const [querySearchQuery, setSearchQuery] = useState(CATEGORY_BLOG_QUERY);

   const options = { next: { revalidate: 30 } };

   const [posts, setPosts] = useState<SanityDocument[]>([]);

   // Debounce search string with 500ms delay
   const debouncedSearchString = useDebounce(searchString, 500);

   useEffect(() => {
      setLoader(true);
      if (!categorySlug) {
         setLoader(false);
         return;
      }
      client
         .fetch<SanityDocument[]>(
            categorySlug === "recent" ? RECENT_QUERY : querySearchQuery,
            {
               searchTerm: debouncedSearchString,
               categorySlug: categorySlug === "recent" ? "" : categorySlug,
            },
            options
         )
         .then((value) => {
            setPosts(value);
            setLoader(false);
         })
         .catch((err) => {
            setPosts([]);
            setLoader(false);
         });
   }, [debouncedSearchString, categorySlug, querySearchQuery]);

   useEffect(() => {
      setLoader(true);
      setCategoryNotFound(false);
      client
         .fetch<SanityDocument[]>(
            CATEGORY_QUERY,
            {
               slug: categorySlug,
            },
            options
         )
         .then((value) => {
            if (!value[0]) {
               setCategoryNotFound(false);
               setCategory([]);
            } else {
               setCategory(value);
            }
            setLoader(false);
         })
         .catch((err) => {
            console.log(err);
            setCategory([]);
            setLoader(false);
            setCategoryNotFound(true);
         });
   }, [categorySlug]);

   if (categoryNotFound && categorySlug !== "recent") {
      return notFound();
   }

   return (
      <div>
         <Head
            bgImg={blogImg}
            // @ts-ignore
            heading={`${category?.name || ""} Blogs`}
            subHeading="Blogs"
            // @ts-ignore
            children_heading={`${category?.name || ""} Blogs`}
         />

         {/* Header Section Blog */}
         <div className="px-4 pt-20 md:px-[52px]">
            <div className="flex flex-col items-center justify-center gap-4">
               <Typography
                  variant="Medium_H2"
                  className={cn(
                     blogFontConfig.title,
                     `text-center capitalize text-foreground`
                  )}
               >
                  {
                     // @ts-ignore
                     category?.name || ""
                  }
                  Blogs
               </Typography>
               <Typography
                  variant="Regular_H6"
                  className={cn(
                     blogFontConfig.subtitle,
                     `text-center text-muted-foreground`
                  )}
               >
                  {siteInfo.description}
               </Typography>
               <div className="mb- relative mt-4 w-full md:w-[400px]">
                  <Input
                     className="w-full rounded-[4px] px-[14px] py-3 pr-10 placeholder:text-muted-foreground focus:!outline-primary focus-visible:!outline-primary"
                     placeholder="Search yoga tips, poses, or articles..."
                     value={searchString}
                     onChange={(e) => setSearchString(e.target.value)}
                  />
                  {searchString ? (
                     <IcoClear
                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() => {
                           setSearchString("");
                        }}
                     />
                  ) : (
                     <IcoSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-primary" />
                  )}
               </div>
            </div>
         </div>

         {/* Blog Posts */}
         <div className="mt-20">
            {loader ? (
               <div>
                  <Loader />
               </div>
            ) : (
               <div className="!relative mx-auto mb-20 grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
                  {posts.map((item, index) => (
                     <BlogCard data={item} key={index} />
                  ))}
               </div>
            )}
            {!loader && posts?.length < 1 && (
               <Typography
                  variant="Medium_H4"
                  className={cn(
                     "block pb-7 text-center text-[31px]",
                     blogFontConfig.title
                  )}
               >
                  No blog found
               </Typography>
            )}
         </div>
      </div>
   );
};

export default CategoryBlogs;
