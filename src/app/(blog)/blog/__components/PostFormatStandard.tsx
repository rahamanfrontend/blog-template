/* eslint-disable @typescript-eslint/no-explicit-any */
import PostAuthor from "./element/PostAuthor";
import PostMetaOne from "./element/PostMetaOne";
import PostMetaTwo from "./element/PostMetaTwo";
import PostTagShare from "./element/PostTagShare";

import { addLinkAttributes, applyBasePathToLinks } from "../_libs/utils";

import { cn } from "../_libs/utils";
import { blogFontConfig } from "../__configs/font";

const PostFormatStandard = ({ postData, allData }: any) => {
   const postContent = applyBasePathToLinks(postData.content, postData.title);

   console.log({
      postData,
      allData,
   });
   // Update postContent with modified links
   const updatedPostContent = addLinkAttributes(postContent);

   return (
      <>
         {postData.featureImg ? <PostMetaOne metaData={postData} /> : ""}

         <div className="post-single-wrapper bg-background py-8">
            <div className="container mx-auto justify-center lg:max-w-7xl">
               <div className="flex flex-wrap justify-between gap-y-12">
                  <div className="mx-auto w-full lg:w-8/12 lg:pr-8">
                     {postData.featureImg ? (
                        ""
                     ) : (
                        <PostMetaTwo metaData={postData} />
                     )}
                     <div
                        className={cn(
                           "axil-post-details ",
                           blogFontConfig.subtitle
                        )}
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
