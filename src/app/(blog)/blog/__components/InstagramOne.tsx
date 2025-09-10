import InstagramSwiper from "./instagram-swiper";
import { Typography } from "./ui/Typography";
import { cn } from "../_libs/utils";
import { client } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";
import { blogFontConfig } from "../__configs/font";

const INSTAGRAM_QUERY = `*[_type == "instagramPost"]{
  postUrl,
  "postImg":postImg.asset->url
}`;

const InstagramOne = async ({ parentClass }: { parentClass: string }) => {
  const options = { next: { revalidate: 30 } };
  const allPosts = await client.fetch<SanityDocument[]>(
    INSTAGRAM_QUERY,
    {},
    options
  );

  return (
    <div className={`axil-instagram-area axil-section-gap ${parentClass || ""}`}>
      <div className="mx-auto justify-center">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-12/12">
            <div className="section-title">
              <h2 className={cn("title")}>
                <Typography
                  variant="Medium_H3"
                  className={cn(
                    "mb-4 sm:mb-6 block text-[24px] sm:text-[28px] lg:!text-[31px] capitalize",
                    blogFontConfig.title
                  )}
                >
                  Instagram Posts
                </Typography>
              </h2>
            </div>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 flex flex-wrap">
          <div className="relative w-full">
            {/* <ul className='instagram-post-list flex flex-wrap'>
              {allPosts.map((data, idx) => (
                <div className='single-post relative w-1/5' key={idx}>
                  <Link href={data.postUrl} target='_blank' rel='noreferrer'>
                    <Image
                      src={data.postImg}
                      height={190}
                      width={190}
                      alt='Instagram Images'
                      className='aspect-square h-[190px] w-[190px] object-cover'
                    />
                    <span className=' instagram-button group absolute inset-0 !flex !items-center !justify-center'>
                      <span className='text-blog-black_ group-hover:text-white'>
                        <IcoInstagram />
                      </span>
                    </span>
                  </Link>
                </div>
              ))}
            </ul> */}
            {allPosts?.length > 0 && <InstagramSwiper allPosts={allPosts} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramOne;
