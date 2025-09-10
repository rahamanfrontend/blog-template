"use client";

/* eslint-disable @next/next/no-img-element */
import { Typography } from "./ui/Typography";
import { cn } from "../_libs/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SanityDocument } from "sanity";
import { blogFontConfig, poppins } from "../__configs/font";

interface BlogCardData extends SanityDocument {
   slug?: { current: string };
   title?: string;
   subtitle?: string;
   featureImg?: string;
   date?: string;
   read_time?: string;
   category?: { slug?: string; name?: string };
   author?: {
      author_img?: string;
      author_name?: string;
      username?: string;
   };
}

const BlogCard = ({ data }: { data: BlogCardData }) => {
   const [isImageLoaded, setIsImageLoaded] = useState(false);

   function formatISODate(isoDate: string): string {
      const date = new Date(isoDate);
      const options: Intl.DateTimeFormatOptions = {
         year: "numeric",
         month: "short",
         day: "2-digit",
      };
      return date.toLocaleDateString("en-US", options);
   }

   // Determine if this is one of the first blog posts (prioritize first 3)
   const isPrioritized = !!(
      data._id &&
      data._id.length > 0 &&
      parseInt(data._id.slice(-2)) < 3
   );

   if (!data) return null;

   return (
      <Link
         href={`/blog/${data?.slug?.current || ""}`}
         className="cursor-pointer"
      >
         <div className="overflow-hidden !rounded-2xl !border !border-[#E4E4E7]">
            <div className="relative w-full">
               {/* Image with blur loading effect */}
               <div
                  className={`absolute inset-0 transition-all duration-500 ${
                     isImageLoaded ? "opacity-0" : "animate-pulse bg-gray-200"
                  }`}
               />

               <Image
                  width={600}
                  height={400}
                  className={`!h-[220px] !w-full rounded-t-2xl object-cover transition-all duration-500 ${
                     isImageLoaded ? "scale-100 blur-0" : "scale-110 blur-xl"
                  }`}
                  src={data.featureImg || ""}
                  alt={data.title || "Blog post"}
                  onLoad={() => setIsImageLoaded(true)}
                  priority={isPrioritized}
                  loading={isPrioritized ? "eager" : "lazy"}
                  fetchPriority={isPrioritized ? "high" : "auto"}
                  quality={isPrioritized ? 100 : 85}
               />
            </div>

            <div className="flex flex-col gap-2 px-8 py-6">
               {data.category?.slug && (
                  <Link
                     href={`/blog/category/${data.category.slug}`}
                     className={cn(
                        "!mr-auto !inline-block cursor-pointer items-center  justify-center gap-2 rounded-full !bg-blog-primary/10 px-3 py-1.5 sm:py-2 capitalize !text-blog-primary",
                        poppins.className
                     )}
                  >
                     {data.category.name || "Category"}
                  </Link>
               )}
               <h2>
                  <Typography
                     className={cn(
                        blogFontConfig.title,
                        "!mt-1 line-clamp-2 !font-medium text-blog-accent"
                     )}
                     variant="Medium_H4"
                  >
                     {data.title || "Blog Post"}
                  </Typography>
               </h2>
               {data.subtitle && (
                  <Typography
                     variant="Regular_H6"
                     className={cn(
                        blogFontConfig.subtitle,
                        "line-clamp-2 !leading-snug !text-blog-info md:!leading-snug"
                     )}
                  >
                     {data.subtitle}
                  </Typography>
               )}
            </div>
            <div className="flex items-center gap-4 px-8 pb-6">
               {data?.author?.author_img && (
                  <Image
                     width={60}
                     height={60}
                     className="!aspect-square !h-[60px] !w-[60px] !rounded-full object-cover"
                     alt={data?.author?.author_name || ""}
                     src={data?.author?.author_img}
                  />
               )}
               <div className={cn(blogFontConfig.subtitle)}>
                  {data?.author?.username && (
                     <h6 className="post-author-name">
                        <Link href={`/blog/author/${data.author.username}`}>
                           <span className="hover-flip-item-wrapper">
                              <span className="hover-flip-item">
                                 <Typography
                                    variant="Regular_H6"
                                    className={cn(
                                       blogFontConfig.subtitle,
                                       "!text-blog-primary hover:!text-blog-primary"
                                    )}
                                    data-text={data.author.author_name}
                                 >
                                    {data.author.author_name || "Author"}
                                 </Typography>
                              </span>
                           </span>
                        </Link>
                     </h6>
                  )}

                  <div className="flex items-center gap-2 whitespace-nowrap">
                     {data.date && (
                        <Typography
                           variant="Regular_H6"
                           className="!text-[13px] text-blog-chips"
                        >
                           {formatISODate(data.date)}
                        </Typography>
                     )}
                     <div className="size-1 min-h-1 min-w-1 rounded-full bg-blog-chips"></div>
                     <Typography
                        variant="Regular_H6"
                        className="!text-[13px] text-blog-chips"
                     >
                        {data?.read_time || "5"} min read
                     </Typography>
                  </div>
               </div>
            </div>
         </div>
      </Link>
   );
};

export default BlogCard;
