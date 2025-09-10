/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";

import Image from "./Image";
import IcoFacebook from "../__icons/ico-facebook";
import IcoLinkedin from "../__icons/ico-linkedin";
import IcoYoutube from "../__icons/ico-youtube";

import IcoInstagram from "../__icons/IcoInstagram";
import { Typography } from "./ui/Typography";
import { cn } from "../_libs/utils";
import { blogFontConfig } from "../__configs/font";
import { ReactNode } from "react";

export const socialIcons: Record<string, ReactNode> = {
  facebook: <IcoFacebook className="text-blog-primary" />,
  youtube: <IcoYoutube className="text-blog-primary" />,
  linkedin: <IcoLinkedin className="text-blog-primary" />,
  instagram: <IcoInstagram className="text-blog-primary" />,
};
const PostMetaTwo = ({ metaData }: { metaData: any }) => {
  console.log({
    metaData,
  });

  const socialMedia = metaData?.author?.socialMedia;
  const socialKeys = socialMedia ? Object.keys(socialMedia) : [];
  console.log(socialKeys);

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
                      <span className="text-white_ peacockGradient btnHover mt-3 w-fit rounded-full  py-1 text-base font-normal capitalize transition-all duration-300 lg:mt-5">
                        <span
                          className={cn(blogFontConfig.subtitle)}
                          data-text={metaData.category?.name}
                        >
                          <Typography
                            variant={"Regular_H6"}
                            className={cn(
                              blogFontConfig.subtitle,
                              " !mr-auto !inline-block items-center justify-center gap-2 rounded-full bg-blog-primary/10 px-3 py-1 capitalize text-blog-primary"
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
                    "!mb-4 block font-bold  text-blog-black_",
                    blogFontConfig.title
                  )}
                  style={{
                    fontSize: "var(--h2)",
                  }}
                >
                  <Typography variant="Medium_H3">{metaData?.title}</Typography>
                </h1>
                {metaData?.subtitle && (
                  <h2>
                    <span
                      className={cn(
                        "text-xl font-medium",
                        blogFontConfig.subtitle
                      )}
                    >
                      {metaData.subtitle}
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
                    className="cursor-pointer  text-blog-dark_gray hover:text-blog-primary "
                    variant="Regular_H6"
                    link="/"
                  >
                    Home
                  </Typography>
                  <div className="size-1 min-h-1 min-w-1 rounded-full bg-dark_blue_"></div>
                  <Typography
                    variant="Regular_H6"
                    className="cursor-pointer  text-blog-dark_gray hover:text-blog-primary "
                    link="/blog"
                  >
                    Blog
                  </Typography>
                  <div className="size-1 min-h-1 min-w-1 rounded-full bg-dark_blue_"></div>
                  <Typography
                    className="cursor-pointer text-blog-primary "
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
                <div className="post-meta-wrapper border-b-[2px] border-gray-300 py-8 !pb-6">
                  <div className="post-meta">
                    <div className="post-author-avatar rounded-full border-none border-gray-200">
                      <Image
                        src={metaData?.author?.author_img}
                        alt={metaData?.author?.author_name}
                        height={70}
                        width={70}
                        className=" size-[70px] !min-w-[70px]  rounded-full"
                      />
                    </div>
                    <div className="content">
                      <h6 className="post-author-name">
                        <Link
                          href={`/blog/author/${metaData?.author?.username}`}
                        >
                          <span className="hover-flip-item-wrapper">
                            <span className="hover-flip-item">
                              <Typography
                                variant="Regular_H5"
                                className={cn(
                                  blogFontConfig.subtitle,
                                  "text-blog-gray_1"
                                )}
                                data-text={metaData?.author?.author_name}
                              >
                                {metaData?.author?.author_name}
                              </Typography>
                            </span>
                          </span>
                        </Link>
                      </h6>
                      <ul className="post-meta-list">
                        <li
                          className={cn(
                            blogFontConfig.subtitle,
                            "text-base !text-blog-chips"
                          )}
                        >
                          {metaData.date}
                        </li>
                        <li
                          className={cn(
                            blogFontConfig.subtitle,
                            "text-base !text-blog-chips"
                          )}
                        >
                          {metaData.read_time} min read
                        </li>
                        <li
                          className={cn(
                            blogFontConfig.subtitle,
                            "text-base !text-blog-chips"
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
