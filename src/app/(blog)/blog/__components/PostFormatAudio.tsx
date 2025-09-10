/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import ReactAudioPlayer from "react-audio-player";

import PostAuthor from "./element/PostAuthor";
import PostMetaTwo from "./element/PostMetaTwo";
import PostTagShare from "./element/PostTagShare";
// import SidebarTwo from "../../sidebar/SidebarOne";

import { addLinkAttributes, applyBasePathToLinks } from "../_libs/utils";

const PostFormatAudio = ({ postData, allData }: any) => {
   const postContent = applyBasePathToLinks(postData.content, postData.title);

   // Update postContent with modified links
   const updatedPostContent = addLinkAttributes(postContent);

   return (
      <>
         <div className="post-single-wrapper bg-white py-8">
            <div className="justify-center">
               <div className="flex flex-wrap justify-between gap-y-12">
                  <div className="!w-full">
                     <div className="px-3 lg:px-0">
                        <PostMetaTwo metaData={postData} />
                     </div>
                     {/* <ReactAudioPlayer src={postData.audio} autoPlay={false} controls className="w-full" /> */}
                     <div
                        className="axil-post-details mt-10 !px-3 lg:px-0"
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

export default PostFormatAudio;
