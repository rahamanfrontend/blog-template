/* eslint-disable @typescript-eslint/ban-ts-comment */
import PostMetaTwo from "./element/PostMetaTwo";
import PostAuthor from "./element/PostAuthor";
import PostTagShare from "./element/PostTagShare";

import { addLinkAttributes, applyBasePathToLinks } from "../_libs/utils";
// @ts-ignore
const PostFormatStandard = ({ postData }) => {
  const postContent = applyBasePathToLinks(postData.content, postData.title);

  // Update postContent with modified links
  const updatedPostContent = addLinkAttributes(postContent);

  return (
    <>
      <div className="post-single-wrapper py-8 bg-white">
        <div className="container mx-auto lg:max-w-7xl justify-center">
          <div className="flex flex-wrap justify-between gap-y-12">
            <div className="w-full mx-auto lg:w-8/12 lg:pr-8">
              {postData.featureImg ? <PostMetaTwo metaData={postData} /> : null}
              {postData.videoLink ? (
                <div className="relative" style={{ paddingTop: "56.25%" }}>
                  <iframe
                  title="video"
                    className="absolute inset-0 w-full h-full rounded-lg"
                    src={postData.videoLink}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                ""
              )}
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
