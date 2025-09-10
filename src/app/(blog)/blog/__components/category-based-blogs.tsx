/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";

import IcoSearch from "../__icons/ico-search";
import blogImg from "../__assets/blog-banner.webp";
import { Input } from "./ui/input";
import { Typography } from "./ui/Typography";
import { cn } from "../_libs/utils";

import { client } from "@/sanity/lib/client";
import { SanityDocument } from "sanity";
import { useDebounce } from "@/hooks/useDebounce";

import BlogCard from "./blog-card";
import GroupTitle from "./group-titile";

//  React swiper **
// Import Swiper React components

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import IcoSliderLeft from "../__icons/IcoSliderLeft";
import Loader from "../__icons/Loader";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import IcoClear from "../__icons/ico-clear";
import { getAllTags } from "../utils/load-all-tags";
import AllTags from "./all-tags";
import BlogModal from "./blog-modal";
import GroupedBlogs from "./group-blogs";
import { blogFontConfig } from "../__configs/font";
import { siteInfo } from "../__configs/siteInfo";
import Head from "./Head";

const GroupedBasedBlogSlider = ({
   categories,
}: {
   categories: SanityDocument[];
}) => {
   const [searchString, setSearchString] = useState("");
   const [selectedTags, setSelectedTags] = useState([]);
   const [selectedTag, setSelectedTag] = useState("");
   const [showModal, setShowModal] = useState(0);

   const SEARCH_QUERY_WITH_TAG = `*[
  _type == "blog" && 
  (
   title match $searchTerm + "*" ${
      selectedTag && `&&  $tagSlug in tags[]->slug.current`
   }
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
    "slug": slug.current
  },
  post_views,
  read_time,
  "author": author->{
    author_name,
    "author_img": author_img.asset->url,
    username
  },
  "tags": tags[]->{
    _id,
    name,  
    "slug": slug.current
  },
  seo_description,
  seo_keywords,
}
`;
   const [querySearchQuery, setSearchQuery] = useState(`*[
  _type == "blog" 
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
    "author_img": author_img.asset->url,
    username
  },
  "tags": tags[]->{
    _id,
    name,  
    "slug": slug.current
  },
  seo_description,
  seo_keywords,
}
`);

   const options = { next: { revalidate: 30 } };

   const [posts, setPosts] = useState<SanityDocument[]>([]);
   const [recentPosts, setRecentPosts] = useState<SanityDocument[]>([]);
   const [tags, setTags] = useState<SanityDocument[]>([]);
   const [loader, setLoader] = useState(false);

   // Debounce search string with 500ms delay
   const debouncedSearchString = useDebounce(searchString, 500);

   useEffect(() => {
      setLoader(true);
      client
         .fetch<SanityDocument[]>(
            querySearchQuery,
            {
               // searchTerm: searchString,
               // selectedTagId: selectedTag,
               // selectedTagIds: selectedTags,
            },
            options
         )
         .then((value) => {
            console.log(value);
            setRecentPosts(value);
            setLoader(false);
         })
         .catch((err) => {
            console.log(err);
            setRecentPosts([]);
            setLoader(false);
         });
   }, [querySearchQuery]);

   useEffect(() => {
      setLoader(true);
      client
         .fetch<SanityDocument[]>(
            SEARCH_QUERY_WITH_TAG,
            {
               searchTerm: debouncedSearchString,
               tagSlug: selectedTag,
               // selectedTagIds: selectedTags,
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
   }, [SEARCH_QUERY_WITH_TAG, debouncedSearchString, selectedTag]);

   useEffect(() => {
      const fetchTags = async () => {
         setLoader(true);
         try {
            const tags = await getAllTags();
            setTags(tags);
            setLoader(false);
         } catch (err) {
            setLoader(false);
         } finally {
            setLoader(false);
         }
      };
      fetchTags();
   }, []);

   return (
      <div>
         <Head bgImg={blogImg} heading={siteInfo.title} subHeading="Blogs" />

         {/* Header Section Blog */}
         <div className="px-4 py-20 !pb-14 md:px-[52px]">
            <div className="flex flex-col items-center justify-center gap-4">
               <Typography
                  variant="Medium_H2"
                  className={cn(
                     blogFontConfig.title,
                     `text-foreground text-center`
                  )}
               >
                  {siteInfo.title}
               </Typography>
               <Typography
                  variant="Regular_H6"
                  className={cn(
                     blogFontConfig.subtitle,
                     `text-muted-foreground text-center`
                  )}
               >
                  {siteInfo.description}
               </Typography>
               <div className="relative flex w-full flex-col items-center justify-center gap-6">
                  {/* first component  */}
                  <div className="relative mt-4 w-full md:w-[400px]">
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
                  <AllTags
                     selectedTag={selectedTag}
                     setSelectedTag={setSelectedTag}
                  />
               </div>
            </div>
         </div>

         {searchString || selectedTag ? (
            <>
               <div className="min-h-[400px]">
                  {!loader && posts?.length < 1 ? (
                     <div className="flex h-32 items-center justify-center">
                        <Typography
                           variant="Medium_H3"
                           className={cn("text-[31px]", blogFontConfig.title)}
                        >
                           No blog found.
                        </Typography>
                     </div>
                  ) : (
                     <div className="!relative mx-auto mb-20 grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
                        {loader
                           ? Array(6)
                                .fill(0)
                                .map((_, index) => (
                                   <div
                                      key={`placeholder-${index}`}
                                      className="overflow-hidden !rounded-2xl !border !border-border"
                                   >
                                      <div className="relative aspect-[1.36] w-full">
                                         <div className="h-[220px] w-full animate-pulse bg-muted"></div>
                                      </div>
                                      <div className="flex flex-col gap-2 px-8 py-6">
                                         <div className="h-6 w-24 animate-pulse rounded-full bg-muted"></div>
                                         <div className="mb-2 h-7 w-full animate-pulse rounded bg-muted"></div>
                                         <div className="h-5 w-3/4 animate-pulse rounded bg-muted"></div>
                                      </div>
                                      <div className="flex items-center gap-4 px-8 pb-6">
                                         <div className="h-[60px] w-[60px] animate-pulse rounded-full bg-muted"></div>
                                         <div>
                                            <div className="mb-2 h-5 w-32 animate-pulse rounded bg-muted"></div>
                                            <div className="h-4 w-24 animate-pulse rounded bg-muted"></div>
                                         </div>
                                      </div>
                                   </div>
                                ))
                           : posts.map((item, index) => (
                                <BlogCard data={item} key={index} />
                             ))}
                     </div>
                  )}
               </div>
            </>
         ) : (
            <>
               <div className="!relative mx-auto mb-20 max-w-7xl px-4 sm:px-6 lg:px-8">
                  <GroupTitle
                     title="Recent Articles"
                     href={`/blog/category/recent`}
                     id="recent-articles"
                  />

                  <div className="min-h-[400px]">
                     {loader ? (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                           {Array(3)
                              .fill(0)
                              .map((_, index) => (
                                 <div
                                    key={`recent-placeholder-${index}`}
                                    className="overflow-hidden !rounded-2xl !border !border-border"
                                 >
                                    <div className="relative aspect-[1.36] w-full">
                                       <div className="h-[220px] w-full animate-pulse bg-muted"></div>
                                    </div>
                                    <div className="flex flex-col gap-2 px-8 py-6">
                                       <div className="h-6 w-24 animate-pulse rounded-full bg-muted"></div>
                                       <div className="mb-2 h-7 w-full animate-pulse rounded bg-muted"></div>
                                       <div className="h-5 w-3/4 animate-pulse rounded bg-muted"></div>
                                    </div>
                                    <div className="flex items-center gap-4 px-8 pb-6">
                                       <div className="h-[60px] w-[60px] animate-pulse rounded-full bg-muted"></div>
                                       <div>
                                          <div className="mb-2 h-5 w-32 animate-pulse rounded bg-muted"></div>
                                          <div className="h-4 w-24 animate-pulse rounded bg-muted"></div>
                                       </div>
                                    </div>
                                 </div>
                              ))}
                        </div>
                     ) : (
                        <Swiper
                           // navigation={{
                           //    nextEl: ".swiper-button-next1",
                           //    prevEl: ".swiper-button-prev1",
                           // }}
                           modules={[Navigation, Autoplay]}
                           spaceBetween={20}
                           breakpoints={{
                              640: {
                                 slidesPerView: 2,
                              },
                              1024: {
                                 slidesPerView: 3,
                              },
                              0: {
                                 slidesPerView: 1,
                              },
                           }}
                           className="trimuk_blog_slider !static"
                        >
                           {recentPosts.map((item, index) => (
                              <SwiperSlide key={index}>
                                 <BlogCard data={item} />
                              </SwiperSlide>
                           ))}
                           {/* <div className="swiper-button-prev1">
                              <IcoSliderLeft className="text-primary" />
                           </div>
                           <div className="swiper-button-next1">
                              <IcoSliderLeft className="rotate-180 text-primary" />
                           </div> */}
                        </Swiper>
                     )}
                  </div>
               </div>

               {categories?.map((category) => (
                  <div key={category._id} className="min-h-[300px]">
                     {!loader ? (
                        <GroupedBlogs
                           groupName={category.name as string}
                           categoryName={category.name as string}
                           id={category._id as string}
                        />
                     ) : (
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                           <div className="mb-6 flex items-center justify-between">
                              <div className="h-8 w-48 animate-pulse rounded bg-muted"></div>
                              <div className="h-6 w-24 animate-pulse rounded bg-muted"></div>
                           </div>
                           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                              {Array(3)
                                 .fill(0)
                                 .map((_, idx) => (
                                    <div
                                       key={`cat-placeholder-${idx}`}
                                       className="h-[350px] animate-pulse rounded-lg bg-muted"
                                    ></div>
                                 ))}
                           </div>
                        </div>
                     )}
                  </div>
               ))}
            </>
         )}

         {/* <AllTags /> */}
      </div>
   );
};

export default GroupedBasedBlogSlider;
