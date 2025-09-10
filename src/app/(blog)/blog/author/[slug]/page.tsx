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
import { Author } from "../../types";

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
import AuthorCardVerticle from "../../__components/author-card-verticle";
import BlogCard from "../../__components/blog-card";
import { blogFontConfig } from "../../__configs/font";
import { siteInfo } from "../../__configs/siteInfo";
import { AUTHOR_BLOGS_QUERY, AUTHOR_QUERY } from "../queris";

const AuthorBlogs = ({ params }: { params: { slug: string } }) => {
   const [searchString, setSearchString] = useState("");
   const [authorUserName, setAuthorUserName] = useState(params?.slug);
   const [loader, setLoader] = useState(false);
   const [author, setAuthor] = useState<Author | null>(null);
   const [authorLoader, setAuthorLoader] = useState(false);
   const [authorNotFound, setAuthorNotFound] = useState(false);
   const [querySearchQuery, setSearchQuery] = useState(AUTHOR_BLOGS_QUERY);

   const options = { next: { revalidate: 30 } };

   const [posts, setPosts] = useState<SanityDocument[]>([]);

   // Debounce search string with 500ms delay
   const debouncedSearchString = useDebounce(searchString, 500);

   console.log({ my_post: posts });
   useEffect(() => {
      setAuthorUserName(params?.slug);
   }, [params?.slug]);

   useEffect(() => {
      setLoader(true);
      client
         .fetch<SanityDocument[]>(
            querySearchQuery,
            {
               searchTerm: debouncedSearchString,
               authorUsername: authorUserName,
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
   }, [debouncedSearchString, authorUserName, querySearchQuery]);

   useEffect(() => {
      setAuthorLoader(true);
      setAuthorNotFound(false);
      client
         .fetch<SanityDocument[]>(
            AUTHOR_QUERY,
            {
               username: authorUserName,
            },
            options
         )
         .then((value) => {
            if (!value[0]) {
               setAuthorNotFound(true);
               setAuthor(null);
            } else {
               setAuthor(value[0] as Author);
            }
            setAuthorLoader(false);
         })
         .catch((err) => {
            console.log(err);
            setAuthor(null);
            setAuthorNotFound(true);
            setAuthorLoader(false);
         });
   }, [authorUserName]);

   console.log({ author });

   if (authorNotFound) {
      return notFound();
   }

   return (
      <div>
         <Head
            bgImg={blogImg}
            // @ts-ignore
            heading={`${author?.author_name} Blogs`}
            subHeading="Blogs"
         />

         {/* Header Section Blog */}
         <div className="px-4 !pt-20 md:px-[52px]">
            <div className="flex flex-col items-center justify-center gap-4">
               <Typography
                  variant="Medium_H2"
                  className={cn(
                     blogFontConfig.title,
                     `text-center text-foreground`
                  )}
               >
                  {
                     // @ts-ignore
                     author?.author_name
                  }{" "}
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

         <div className="mx-auto !mt-20 flex max-w-7xl flex-col lg:flex-row lg:gap-10">
            {loader && <Loader />}
            {!loader && (
               <>
                  <div className="flex flex-grow items-center justify-center">
                     {posts?.length > 0 ? (
                        <div className="!relative mx-auto mb-20 grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-2">
                           {posts.map((item, index) => (
                              <BlogCard data={item} key={index} />
                           ))}
                        </div>
                     ) : (
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
               </>
            )}
            <div className="mb-6 lg:mb-0 lg:w-[388px] lg:min-w-[388px]">
               {authorLoader ? (
                  <Loader />
               ) : (
                  <AuthorCardVerticle dataAuthor={{ author }} />
               )}
            </div>
         </div>
      </div>
   );
};

export default AuthorBlogs;
