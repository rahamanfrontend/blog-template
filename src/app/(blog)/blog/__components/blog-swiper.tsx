"use client";

// import IcoSliderLeft from "../__icons/IcoSliderLeft";
import { SanityDocument } from "next-sanity";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard from "./blog-card";

const BlogSwiper = ({ allPosts }: { allPosts: SanityDocument[] }) => {
   return (
      <Swiper
         // navigation={{
         //    nextEl: ".swiper-button-next1",
         //    prevEl: ".swiper-button-prev1",
         // }}
         modules={[Navigation]}
         spaceBetween={20}
         breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            0: { slidesPerView: 1 },
         }}
         className=" trimuk_blog_slider trimuk_blog_slider2  !static"
      >
         {allPosts.map((item, index) => (
            <SwiperSlide key={index}>
               <BlogCard data={item} />
            </SwiperSlide>
         ))}
         {/* Custom navigation buttons */}
         {/* <div className="swiper-button-prev1">
            <IcoSliderLeft className="text-blog-primary" />
         </div>
         <div className="swiper-button-next1">
            <IcoSliderLeft className="rotate-180 text-blog-primary" />
         </div> */}
      </Swiper>
   );
};

export default BlogSwiper;
