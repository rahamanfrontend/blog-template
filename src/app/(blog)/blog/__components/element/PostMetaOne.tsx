/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import Image from "../Image";
import { blogFontConfig } from "../../__configs/font";
import { cn } from "../../_libs/utils";

const PostMetaOne = ({ metaData }: any) => {
  console.log(metaData.featureImg);
  return (
    <div className="banner banner-single-post post-formate post-standard w-full">
      <div className=" mx-auto lg:container">
        <div className="flex flex-wrap justify-center">
          <div className="w-full ">
            <div className="content-block ">
              <div className="post-thumbnail ">
                <Image
                  src={metaData?.featureImg}
                  alt={metaData.title}
                  height={720}
                  width={1440}
                  className={"h-72 max-h-[720px] w-full object-cover sm:h-auto"}
                />
              </div>
              <div className="post-content ">
                <div className="post-cat w-full">
                  <div className={cn("post-cat-list", blogFontConfig.subtitle)}>
                    <Link
                      href={`/blog/category/${metaData.category.name}`}
                      prefetch={true}
                    >
                      <span className="hover-flip-item-wrapper">
                        <span className="hover-flip-item">
                          <span data-text={metaData.category.name}>
                            {metaData.category.name}
                          </span>
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
                <h1
                  className={cn(
                    "title text-3xl font-semibold",
                    blogFontConfig.title
                  )}
                >
                  {metaData.title}
                </h1>

                <div className="post-meta-wrapper flex items-center justify-between">
                  <div className="post-meta flex items-center">
                    <div className="post-author-avatar border-rounded">
                      <Image
                        src={metaData.author_img}
                        alt={metaData.author_name}
                        height={50}
                        width={50}
                        className={"h-14 w-14"}
                      />
                    </div>
                    <div className={cn("content", blogFontConfig.subtitle)}>
                      <h6 className="post-author-name">
                        {/* <Link
                          href={metaData.author_url}
                          target='_blank'
                          rel='noreferrer'
                          className={cn('hover-flip-item-wrapper')}
                        >
                          <span className='hover-flip-item'>
                            <span data-text={metaData.author_name}>
                              {metaData.author_name}
                            </span>
                          </span>
                        </Link> */}
                        {/* </Link> */}
                      </h6>
                      <ul className="post-meta-list flex list-none space-x-2">
                        <li>{metaData.date}</li>
                        <li>{metaData.post_views}</li>
                      </ul>
                    </div>
                  </div>
                  {/* <ul
                    className={cn(
                      "social-share-transparent flex justify-end space-x-2"
                    )}
                  >
                    {metaData?.author_social?.map((social) => ( */}
                      {/* <li key={social?.url}> */}
                        {/* <Link href={social.url}>
                          <i className={social.icon} />
                        </Link> */}
                      {/* </li> */}
                    {/* ))}
                  </ul> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostMetaOne;
