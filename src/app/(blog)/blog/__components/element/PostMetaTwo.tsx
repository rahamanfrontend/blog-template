/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";

import Image from "../Image";

import { Typography } from "../ui/Typography";
import { cn } from "../../_libs/utils";
import IcoFacebook from "../../__icons/ico-facebook";
import IcoYoutube from "../../__icons/ico-youtube";
import IcoLinkedin from "../../__icons/ico-linkedin";
import IcoInstagram from "../../__icons/IcoInstagram";
import { blogFontConfig } from "../../__configs/font";

export const socialIcons = {
   facebook: <IcoFacebook className="text-primary" />,
   youtube: <IcoYoutube className="text-primary" />,
   linkedin: <IcoLinkedin className="text-primary" />,
   instagram: <IcoInstagram className="text-primary" />,
};
// @ts-ignore
const PostMetaTwo = ({ metaData }: any) => {
   const socialMedia = metaData?.author?.socialMedia;
   const socialKeys = socialMedia ? Object.keys(socialMedia) : [];

   return (
      <div className="pt-10">
         <div className="container mx-auto">
            <div className="row">
               <div className="w-full">
                  {/* Start Single Slide */}
                  <div className="content-block">
                     {/* Start Post Content */}
                     <div className="post-content">
                        <div className="post-cat">
                           <div className="post-cat-list">
                              <Link
                                 href={`/blog/category/${metaData?.category?.slug}`}
                                 prefetch={true}
                              >
                                 <span className="text-primary-foreground  btnHover mt-3 w-fit rounded-full  py-1 text-base font-normal capitalize transition-all duration-300 lg:mt-5">
                                    <span
                                       className={cn(blogFontConfig.subtitle)}
                                       data-text={metaData.category?.name}
                                    >
                                       <Typography
                                          variant={"Regular_H6"}
                                          className={cn(
                                             blogFontConfig.subtitle,
                                             " !mr-auto !inline-block items-center justify-center gap-2 rounded-full bg-primary/10 px-3 py-1 capitalize text-primary"
                                          )}
                                       >
                                          {metaData.category?.name}
                                       </Typography>
                                    </span>
                                 </span>
                              </Link>
                           </div>
                        </div>
                        <h1
                           className={cn(
                              "!mb-4 block mt-5 font-bold  text-foreground",
                              blogFontConfig.title
                           )}
                           style={{
                              fontSize: "var(--h2)",
                           }}
                        >
                           <Typography
                              variant="Medium_H3"
                              className="!leading-6 md:!leading-[56px]  "
                           >
                              {metaData?.title}
                           </Typography>
                        </h1>
                        {metaData?.subtitle && (
                           <h2>
                              <span
                                 className={cn(
                                    "text-xl font-medium ",
                                    blogFontConfig.subtitle
                                 )}
                              >
                                 <Typography
                                    variant="Medium_H5"
                                    className="!text-muted-foreground"
                                 >
                                    {metaData.subtitle}
                                 </Typography>
                              </span>
                           </h2>
                        )}

                        <div
                           className={cn(
                              "mb-10  mt-8  flex items-center gap-2 capitalize",
                              blogFontConfig.subtitle
                           )}
                        >
                           <Typography
                              className="cursor-pointer  text-muted-foreground hover:text-primary "
                              variant="Regular_H6"
                              link="/"
                           >
                              Home
                           </Typography>
                           <div className="!size-1 min-h-1 min-w-1 !rounded-full !bg-muted-foreground"></div>
                           <Typography
                              variant="Regular_H6"
                              className="cursor-pointer  text-muted-foreground hover:text-primary "
                              link="/blog"
                           >
                              Blog
                           </Typography>
                           <div className="!size-1 min-h-1 min-w-1 !rounded-full !bg-muted-foreground"></div>
                           <Typography
                              className="cursor-pointer !text-primary  hover:!text-primary/80"
                              variant="Regular_H6"
                              link="/"
                           >
                              {metaData?.title.slice(0, 20)}...
                           </Typography>
                        </div>

                        {/*  Feature image  */}
                        <div className="h-full w-full rounded-lg">
                           <Image
                              src={metaData?.featureImg}
                              alt={metaData?.title}
                              height={200}
                              width={400}
                              className="h-full w-full object-cover"
                           />
                        </div>

                        {/* Post Meta */}
                        <div className="post-meta-wrapper border-b-[2px] border-border py-8 !pb-6">
                           <div className="post-meta">
                              <div className="post-author-avatar rounded-full border-none border-border">
                                 <Image
                                    src={metaData?.author?.author_img}
                                    alt={metaData?.author?.author_name}
                                    height={70}
                                    width={70}
                                    className=" !size-[70px] !min-w-[70px]  !rounded-full"
                                 />
                              </div>
                              <div className="content">
                                 <Link
                                    href={`/blog/author/${metaData?.author?.username}`}
                                 >
                                    <h6 className="post-author-name">
                                       <span className="hover-flip-item-wrapper">
                                          <span className="hover-flip-item">
                                             <Typography
                                                variant="Regular_H5"
                                                className={cn(
                                                   blogFontConfig.subtitle,
                                                   "!text-primary"
                                                )}
                                                data-text={
                                                   metaData?.author?.author_name
                                                }
                                             >
                                                {metaData?.author?.author_name}
                                             </Typography>
                                          </span>
                                       </span>
                                    </h6>
                                 </Link>
                                 <ul className="post-meta-list">
                                    <li
                                       className={cn(
                                          blogFontConfig.subtitle,
                                          "text-base !text-muted-foreground"
                                       )}
                                    >
                                       {metaData.date}
                                    </li>
                                    <li
                                       className={cn(
                                          blogFontConfig.subtitle,
                                          "text-base !text-muted-foreground"
                                       )}
                                    >
                                       {metaData.read_time} min read
                                    </li>
                                    <li
                                       className={cn(
                                          blogFontConfig.subtitle,
                                          "text-base !text-muted-foreground"
                                       )}
                                    >
                                       {metaData.post_views} views
                                    </li>
                                 </ul>
                              </div>
                           </div>
                           <ul className="social-share-transparent flex justify-end gap-6">
                              {socialKeys?.length > 0 &&
                                 socialKeys?.map((item, key) => (
                                    <div key={key}>
                                       <Link href={socialMedia[item]}>
                                          {/* @ts-ignore */}
                                          {socialIcons[item]}
                                       </Link>
                                    </div>
                                 ))}
                           </ul>
                        </div>
                     </div>
                     {/* End Post Content */}
                  </div>
                  {/* End Single Slide */}
               </div>
            </div>
         </div>
      </div>
   );
};

export default PostMetaTwo;
