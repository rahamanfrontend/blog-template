"use client";

import IcoInstagram from "../__icons/IcoInstagram";

import { SanityDocument } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useEffect, useState } from "react";

const InstagramSwiper = ({ allPosts }: { allPosts: SanityDocument[] }) => {
   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth < 640);
      };

      // Set initial value
      handleResize();

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Clean up
      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, []);
   return (
      <Swiper
         // navigation={{
         //    nextEl: ".swiper-button-next1",
         //    prevEl: ".swiper-button-prev1",
         // }}
         modules={[Navigation, Autoplay]}
         spaceBetween={isMobile ? 8 : 10}
         breakpoints={{
            0: { slidesPerView: 1.5, spaceBetween: 8 },
            375: { slidesPerView: 2, spaceBetween: 8 },
            640: { slidesPerView: 3, spaceBetween: 10 },
            768: { slidesPerView: 4, spaceBetween: 10 },
            1024: { slidesPerView: 5, spaceBetween: 10 },
         }}
         className="trimuk_blog_slider !static"
      >
         {allPosts.map((item, index) => (
            <SwiperSlide key={index}>
               <div className="relative w-full aspect-square" key={index}>
                  <Link
                     href={item.postUrl}
                     target="_blank"
                     rel="noreferrer"
                     className="block h-full w-full"
                  >
                     <Image
                        src={item.postImg}
                        fill
                        alt="Instagram Images"
                        className="rounded-3xl object-cover"
                     />
                     <span className="instagram-button group absolute inset-0 flex items-center justify-center">
                        <span className="text-blog-black_ group-hover:text-white">
                           <IcoInstagram className="text-blog-black_ group-hover:text-blog-primary" />
                        </span>
                     </span>
                  </Link>
               </div>
            </SwiperSlide>
         ))}
         {/* Custom navigation buttons */}
         {/* <div className="swiper-button-prev1 hidden sm:block">
            <IcoSliderLeft className="text-blog-primary" />
         </div>
         <div className="swiper-button-next1 hidden sm:block">
            <IcoSliderLeft className="rotate-180 text-blog-primary" />
         </div> */}
      </Swiper>
   );
};

export default InstagramSwiper;
