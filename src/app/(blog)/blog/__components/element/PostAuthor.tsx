/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import Image from "../Image";

import ButtonPrimary from "../ButtonPrimary";
import ButtonSecondary from "../ButtonSecondary";
import { Typography } from "../ui/Typography";
import { cn } from "../../_libs/utils";
import Link from "next/link";

import { socialIcons } from "./PostMetaTwo";
import { blogFontConfig } from "../../__configs/font";
import IcoArrowRight from "../../__icons/IcoArrowRight";
import { siteInfo } from "../../__configs/siteInfo";

const PostAuthor = ({ dataAuthor }: any) => {
   console.log({
      dataAuthor,
   });
   return (
      <div className="w-full px-4 sm:px-5 lg:px-0">
         <Typography
            variant="Medium_H3"
            className={cn(
               "mb-4 sm:mb-6 mt-8 sm:mt-12 block text-[24px] sm:!text-[28px] lg:!text-[31px]",
               blogFontConfig.title
            )}
         >
            About the author
         </Typography>
         <div className="w-full rounded-xl sm:rounded-2xl border border-[#E4E4E7] bg-[#fafafa] p-4 sm:p-6 lg:p-8">
            <div className="post-meta-wrapper !flex !flex-col justify-center lg:justify-between lg:items-center lg:!flex-row">
               <div className="post-meta flex flex-col items-center lg:flex-row lg:items-start gap-3 sm:gap-4">
                  <div className="post-author-avatar rounded-full border-none border-gray-200">
                     <Image
                        src={dataAuthor?.author?.author_img}
                        alt={dataAuthor?.author?.author_name}
                        height={50}
                        width={50}
                        className="!h-16 !w-16 sm:!h-20 sm:!w-20 lg:!h-24 lg:!w-24 !min-w-16 sm:!min-w-20 lg:!min-w-24 !rounded-full"
                     />
                  </div>
                  <div className="content flex flex-col items-center lg:items-start">
                     <h6 className="post-author-name">
                        <Link
                           href={`/blog/author/${dataAuthor?.author?.username}`}
                        >
                           <span className="hover-flip-item-wrapper">
                              <span className="hover-flip-item">
                                 <Typography
                                    variant="Medium_H4"
                                    className={cn(
                                       blogFontConfig.subtitle,
                                       "text-[18px] sm:text-[20px] lg:text-[22px]"
                                    )}
                                    data-text={dataAuthor?.author?.author_name}
                                 >
                                    {dataAuthor?.author?.author_name}
                                 </Typography>
                              </span>
                           </span>
                        </Link>
                     </h6>
                     <Typography
                        variant="Regular_H6"
                        className={cn(
                           blogFontConfig.subtitle,
                           "text-blog-chips text-center lg:text-left text-sm sm:text-base"
                        )}
                     >
                        {dataAuthor?.author?.author_designation}
                     </Typography>
                  </div>
               </div>
               <ul className="social-share-transparent flex justify-center lg:justify-end gap-4 sm:gap-6 mt-4 lg:mt-0">
                  {dataAuthor?.socialKeys?.length > 0 &&
                     dataAuthor?.socialKeys?.map((item: any, key: any) => (
                        <div key={key} className="text-sm sm:text-base">
                           <Link href={dataAuthor?.author?.socialMedia[item]}>
                              {/* @ts-ignore */}
                              {socialIcons[item]}
                           </Link>
                        </div>
                     ))}
               </ul>
            </div>
            <Typography
               variant="Regular_H6"
               className="my-4 sm:my-6 text-center lg:!text-start block text-sm sm:text-base !leading-relaxed"
            >
               {dataAuthor?.author?.author_bio}
            </Typography>
            <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-center md:justify-between">
               <div className="flex w-full flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 sm:justify-start">
                  <ButtonPrimary
                     content={siteInfo.primaryBtnContent}
                     onClick={() =>
                        window.open(siteInfo.primaryBtnLink, "_blank")
                     }
                     className="w-full sm:w-auto rounded-full bg-blog-primary px-4 py-2 text-center text-[12px] sm:text-[14px] font-bold text-white duration-500 hover:opacity-90 hover:shadow-lg sm:px-6 sm:py-3 md:px-8 md:text-base"
                  />
                  <ButtonSecondary
                     content={siteInfo.secondaryBtnContent}
                     onClick={() =>
                        window.open(siteInfo.secondaryBtnLink, "_blank")
                     }
                     className="w-full sm:w-auto rounded-full border border-black bg-transparent px-4 py-2 text-center text-[12px] sm:text-[14px] font-bold text-black duration-500 hover:!border-blog-primary hover:!text-blog-primary hover:!bg-transparent sm:px-6 sm:py-3 md:px-8 md:text-base"
                  />
               </div>
               <div className="flex items-center justify-center sm:justify-start gap-1 text-nowrap">
                  <Typography
                     link="/blog"
                     variant="Medium_H5"
                     className={cn(
                        blogFontConfig.title,
                        "block cursor-pointer text-blog-discover underline text-sm sm:text-base"
                     )}
                  >
                     Discover Blogs
                  </Typography>
                  <IcoArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
               </div>
            </div>
         </div>
      </div>
   );
};

export default PostAuthor;
