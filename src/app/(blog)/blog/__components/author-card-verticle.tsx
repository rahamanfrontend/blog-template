/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { socialIcons } from "./PostMetaTwo";
import Image from "./Image";

import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";
import { Typography } from "./ui/Typography";
import { cn } from "../_libs/utils";
import Link from "next/link";
import { blogFontConfig } from "../__configs/font";
import { siteInfo } from "../__configs/siteInfo";

const AuthorCardVerticle = ({ dataAuthor }: any) => {
   console.log(dataAuthor);
   const socialMedia = dataAuthor?.author?.socialMedia;
   const socialKeys = socialMedia ? Object.keys(socialMedia) : [];
   console.log({ socialMedia, socialKeys });
   return (
      <div className="w-full px-4 sm:px-5 lg:sticky lg:top-28 lg:mb-10 lg:px-0">
         <div className="w-full rounded-2xl border border-border bg-card p-4 sm:p-6 md:p-8">
            <div className="post-meta-wrapper">
               <div className="post-meta flex flex-col items-center gap-3 sm:flex-row sm:items-start">
                  <div className="post-author-avatar rounded-full border-none border-border">
                     <Image
                        src={dataAuthor?.author?.author_img}
                        alt={dataAuthor?.author?.author_name}
                        height={50}
                        width={50}
                        className="aspect-square h-16 w-16 !min-w-[64px] rounded-full sm:h-20 sm:w-20 sm:!min-w-[80px]"
                     />
                  </div>
                  <div className="content flex flex-col items-center text-center sm:!items-start sm:!text-start">
                     <h6 className="post-author-name">
                        <Link
                           href={`/blog/author/${dataAuthor?.author?.author_name}`}
                        >
                           <span className="hover-flip-item-wrapper">
                              <span className="hover-flip-item">
                                 <Typography
                                    variant="Regular_H4"
                                    className={cn(
                                       blogFontConfig.subtitle,
                                       "!text-foreground"
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
                           "text-muted-foreground"
                        )}
                     >
                        {dataAuthor?.author?.author_designation}
                     </Typography>
                  </div>
               </div>
            </div>
            <div className="mt-4 flex justify-center sm:justify-start">
               <ul className="social-share-transparent flex justify-start gap-4 sm:gap-6">
                  {socialKeys?.length > 0 &&
                     socialKeys?.map((item, key) => (
                        <div key={key}>
                           {/* @ts-ignore */}
                           <Link href={socialMedia?.[item]}>
                              {socialIcons?.[item]}
                           </Link>
                        </div>
                     ))}
               </ul>
            </div>

            <Typography
               variant="Regular_H6"
               className={cn(
                  "my-4 block text-center !leading-snug sm:!text-start md:!leading-snug",
                  blogFontConfig.subtitle
               )}
            >
               {dataAuthor?.author?.author_bio}
            </Typography>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
               <ButtonPrimary
                  content={siteInfo.primaryBtnContent}
                  onClick={() => window.open(siteInfo.primaryBtnLink, "_blank")}
                  className="w-full rounded-full bg-primary px-4 py-2.5 text-[13px] font-bold text-primary-foreground duration-500 hover:opacity-90 hover:shadow-lg sm:w-auto sm:px-6 sm:py-3 sm:text-[14px] md:px-8 md:text-base"
               />
               <ButtonSecondary
                  content={siteInfo.secondaryBtnContent}
                  onClick={() =>
                     window.open(siteInfo.secondaryBtnLink, "_blank")
                  }
                  className="w-full rounded-full border border-border bg-transparent px-4 py-2.5 text-[13px] font-bold text-foreground duration-500 hover:border-primary hover:bg-primary hover:text-primary-foreground sm:w-auto sm:px-6 sm:py-3 sm:text-[14px] md:px-8 md:text-base"
               />
            </div>

            {/* <Button variant='outline' className=''>
        Yoga Courses
      </ButtonP> */}
         </div>
      </div>
   );
};

export default AuthorCardVerticle;
