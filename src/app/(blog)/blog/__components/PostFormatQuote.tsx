/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import PostMetaThree from "./Post";
import PostAuthor from "./element/PostAuthor";
import PostTagShare from "./element/PostTagShare";

import { addLinkAttributes, applyBasePathToLinks } from "../_libs/utils";

const PostFormatQuote = ({ postData, allData }: any) => {
   const postContent = applyBasePathToLinks(postData.content, postData.title);

   // Update postContent with modified links
   const updatedPostContent = addLinkAttributes(postContent);

   return (
      <>
         <div className="post-single-wrapper py-8 bg-background">
            <div className="container mx-auto lg:max-w-7xl justify-center">
               <div className="flex flex-wrap justify-between gap-y-12">
                  <div className="w-full mx-auto lg:w-8/12 lg:pr-8">
                     {/* <PostMetaThree metaData={postData} /> */}
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

export default PostFormatQuote;
