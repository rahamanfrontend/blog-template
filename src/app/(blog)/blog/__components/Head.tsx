"use client";

// import core package
import Image, { StaticImageData } from "next/image";
import { FC, memo, useState } from "react";

// import component
import { Typography } from "./ui/Typography";

// import font
import { cn } from "../_libs/utils";
import { blogFontConfig } from "../__configs/font";

interface HeadProps {
   heading: string;
   subHeading: string;
   children_heading?: string;
   bgImg: StaticImageData | string;
   className?: string;
}

const Head: FC<HeadProps> = memo(
   ({ heading, subHeading, bgImg, className, children_heading }) => {
      const [isImageLoaded, setIsImageLoaded] = useState(false);
      return (
         <section
            className={cn(
               "relative overflow-hidden bg-black py-12 sm:py-20 lg:py-40"
            )}
         >
            <div className="absolute inset-0">
               {/* Skeleton loader */}
               <div
                  className={`absolute inset-0 bg-gradient-to-r from-[#451000]/70 to-[#451000]/30 animate-pulse transition-opacity duration-500 ${
                     isImageLoaded ? "opacity-0" : "opacity-100"
                  }`}
               />

               <Image
                  src={bgImg}
                  placeholder="blur"
                  alt={`${heading} background image`}
                  priority={true}
                  loading="eager"
                  fetchPriority="high"
                  quality={100}
                  fill
                  sizes="100vw"
                  className={cn(
                     "h-full w-full !object-cover object-right transition-all duration-500 md:origin-top-left md:object-left",
                     isImageLoaded ? "scale-100 blur-0" : "scale-110 blur-xl",
                     className
                  )}
                  onLoad={() => setIsImageLoaded(true)}
                  style={{
                     color: "transparent",
                  }}
               />
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-[#451000] from-10% via-80% to-transparent to-70%"></div>

            <div className="relative mx-auto max-w-7xl px-4 capitalize sm:px-6 lg:px-8">
               <div>
                  <Typography
                     variant="Medium_H1"
                     className={`${blogFontConfig.title} block leading-tight text-white`}
                  >
                     {heading}
                  </Typography>
                  <div className="mt-2 flex items-center">
                     <Typography
                        variant="Regular_H5"
                        link="/"
                        className="text-white"
                     >
                        Home .
                     </Typography>
                     <Typography
                        variant="Regular_H5"
                        className="ml-2 cursor-pointer text-white"
                     >
                        {subHeading} {children_heading && "."}
                     </Typography>
                     {children_heading && (
                        <Typography
                           variant="Regular_H5"
                           className="ml-2 cursor-pointer text-white"
                        >
                           {children_heading}
                        </Typography>
                     )}
                  </div>
               </div>
            </div>
         </section>
      );
   }
);

Head.displayName = "Head";

export default Head;
