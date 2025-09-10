/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import IcoSliderLeft from "../__icons/IcoSliderLeft";
import { client } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";
import { useEffect, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard from "./blog-card";
import GroupTitle from "./group-titile";

interface GroupedBlogsProps {
   groupName: string;
   categoryName: string;
   id: string;
}

const GroupedBlogs = ({ groupName, categoryName, id }: GroupedBlogsProps) => {
   const [query, setQuery] =
      useState(`*[_type == "blog" && category->name == $categoryName]{
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
  name, 
  "slug": slug.current
  },
  seo_description,
  seo_keywords,
}`);

   console.log(query);
   const options = { next: { revalidate: 30 } };

   const [posts, setPosts] = useState<SanityDocument[]>([]);

   useEffect(() => {
      client
         .fetch<SanityDocument[]>(
            query,
            {
               categoryName: categoryName,
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
   }, [query, categoryName]);

   return (
      <div className="!relative mx-auto mb-20 max-w-7xl px-4 sm:px-6 lg:px-8 ">
         <GroupTitle
            title={groupName}
            href={`/blog/category/${posts?.[0]?.category?.slug}`}
            id={id}
         />
         <Swiper
            // navigation={{
            //    nextEl: ".swiper-button-next1", // Custom class for the next button
            //    prevEl: ".swiper-button-prev1", // Custom class for the prev button
            // }}
            modules={[Navigation, Autoplay]}
            spaceBetween={20} // Adjust spacing between slides
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
            className="trimuk_blog_slider !static "
         >
            {posts.map((item, index) => (
               <SwiperSlide key={index}>
                  <BlogCard data={item} />
               </SwiperSlide>
            ))}
            {/* Custom navigation buttons */}
            {/* <div className="swiper-button-prev1">
               <IcoSliderLeft className="text-primary" />
            </div>
            <div className="swiper-button-next1">
               <IcoSliderLeft className="rotate-180 text-primary" />
            </div> */}
         </Swiper>
      </div>
   );
};

export default GroupedBlogs;
