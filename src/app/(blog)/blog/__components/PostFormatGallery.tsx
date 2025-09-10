/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from "react";

import Slider from "react-slick";
import mediumZoom from "medium-zoom";
import { ArrowRight, ArrowLeft } from "react-feather";

import Image from "./Image";

import PostMetaTwo from "./element/PostMetaTwo";
import PostAuthor from "./element/PostAuthor";
import PostTagShare from "./element/PostTagShare";

import { addLinkAttributes } from "../_libs/utils";

const PostFormatStandard = ({ postData }: any) => {
   const basePathLink =
      process.env.NODE_ENV === "production"
         ? (process.env.REACT_APP_BASEPATH ?? "")
         : "";

   const postContent = postData.content.replaceAll(
      "/images/",
      basePathLink + "/images/"
   );

   useEffect(() => {
      const zoom = mediumZoom(".axil-post-details img", {
         margin: 24,
         background: "hsl(var(--background))",
      });

      return () => {
         zoom.detach();
      };
   }, []);

   // Update postContent with modified links
   const updatedPostContent = addLinkAttributes(postContent);

   const SlideGallery = () => {
      function SlickNextArrow(props: any) {
         const { className, onClick } = props;
         return (
            <button
               className={`slide-arrow next-arrow ${className} flex items-center justify-center hover:text-primary`}
               onClick={onClick}
            >
               <ArrowRight />
            </button>
         );
      }

      function SlickPrevArrow(props: any) {
         const { className, onClick } = props;
         return (
            <button
               className={`slide-arrow prev-arrow ${className} flex items-center justify-center hover:text-primary`}
               onClick={onClick}
            >
               <ArrowLeft />
            </button>
         );
      }

      const slideSettings = {
         dots: false,
         infinite: false,
         speed: 500,
         slidesToShow: 1,
         slidesToScroll: 1,
         nextArrow: <SlickNextArrow />,
         prevArrow: <SlickPrevArrow />,
      };
      return (
         <Slider
            {...slideSettings}
            className="post-gallery-activation axil-slick-arrow arrow-between-side"
         >
            {
               // eslint-disable-next-line @typescript-eslint/ban-ts-comment
               // @ts-ignore
               postData.gallery.map((data, index) => (
                  <div className="post-images" key={index}>
                     <Image
                        src={data}
                        alt={postData.title}
                        height={500}
                        width={810}
                        className={
                           "rounded-lg h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] object-cover"
                        }
                     />
                  </div>
               ))
            }
         </Slider>
      );
   };

   return (
      <>
         <div className="post-single-wrapper py-8 bg-background">
            <div className="container mx-auto lg:max-w-7xl justify-center">
               <div className="flex flex-wrap justify-between gap-y-12">
                  <div className="w-full mx-auto lg:w-8/12 lg:pr-8">
                     {postData.featureImg ? (
                        <PostMetaTwo metaData={postData} />
                     ) : (
                        ""
                     )}
                     {postData.gallery ? <SlideGallery /> : ""}
                     <div
                        className="axil-post-details mt-10"
                        dangerouslySetInnerHTML={{ __html: updatedPostContent }}
                     ></div>
                     <PostTagShare postTags={postData} />
                     <PostAuthor dataAuthor={postData} />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default PostFormatStandard;
