/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";

import {
   Facebook,
   Instagram,
   Linkedin,
   ThumbsUp,
   Twitter,
} from "react-feather";

import { Typography } from "../ui/Typography";
import { cn } from "../../_libs/utils";
import { blogFontConfig } from "../../__configs/font";

const PostTagShare = ({ postTags }: any) => {
   const isHideSocialShare = true;

   return (
      <>
         <div className="flex flex-col gap-6 px-3 lg:px-0">
            <Typography
               variant="Medium_H3"
               className={cn("mt-12 block !text-[31px]", blogFontConfig.title)}
            >
               Tags
            </Typography>
            <div className="mb-8 flex flex-wrap gap-y-6">
               {postTags?.tags?.map((data: any, index: any) => (
                  <Link
                     href={`/blog/tag/${data.slug}`}
                     prefetch={true}
                     key={index}
                     className=""
                  >
                     <span className="m-1.5 rounded-lg border border-blog-primary bg-blog-primary px-5 py-2 text-sm font-semibold capitalize text-white transition-colors duration-300 hover:bg-opacity-90">
                        <span data-text={data}>{data.name}</span>
                     </span>
                  </Link>
               ))}
            </div>
         </div>
         <div
            className={`${
               isHideSocialShare ? "hidden" : "flex"
            } social-share-block flex-wrap items-center justify-between gap-4`}
         >
            <ul className="social-icon text-md flex flex-nowrap items-center justify-center space-x-2">
               <li>
                  <Link
                     href="https://facebook.com/"
                     className="hover:text-facebook items-center border-[1px] !bg-transparent p-3 text-gray-600 transition-colors duration-300"
                  >
                     <ThumbsUp />
                  </Link>
               </li>
               <span>2.2k Like</span>
            </ul>

            <ul className="social-icon text-md flex flex-nowrap items-center justify-center space-x-2">
               <li>
                  <Link
                     href="https://facebook.com/"
                     className="icon-rounded-transparent md-size hover:text-facebook p-3 text-gray-600 transition-colors duration-300"
                  >
                     <Facebook />
                  </Link>
               </li>
               <li>
                  <Link
                     href="https://instagram.com"
                     className="icon-rounded-transparent md-size hover:text-instagram p-3.5 text-gray-600 transition-colors duration-300"
                  >
                     <Instagram />
                  </Link>
               </li>
               <li>
                  <Link
                     href="https://twitter.com"
                     className="icon-rounded-transparent md-size hover:text-twitter p-3.5 text-gray-600 transition-colors duration-300"
                  >
                     <Twitter />
                  </Link>
               </li>
               <li>
                  <Link
                     href="https://linkedin.com"
                     className="icon-rounded-transparent md-size hover:text-linkedin p-3.5 text-gray-600 transition-colors duration-300"
                  >
                     <Linkedin />
                  </Link>
               </li>
            </ul>
         </div>
      </>
   );
};

export default PostTagShare;
