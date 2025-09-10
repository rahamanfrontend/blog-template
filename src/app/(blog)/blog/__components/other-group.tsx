/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import Loader from "../__icons/Loader";
import { client } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";
import { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard from "./blog-card";
import GroupTitle from "./group-titile";
import IcoSliderLeft from "../__icons/IcoSliderLeft";

const OtherBlogs = ({
  groupName,
  categoryName,
}: {
  groupName?: string;
  categoryName?: string;
}) => {
  const [query, setQuery] =
    useState(`*[_type == "blog" && category->name != $categoryName]{
  _id,
  title,
  slug,
  subtitle,
  "featureImg": featureImg.asset->url,
  date,
  "category": category->{
  name, 
  _id, 
  "slug": slug.current
  },
  post_views,
  read_time,
  "author": author->{
    author_name,
    "author_img": author_img.asset->url, 
    username
  },
  "tags": tags[]->{ 
  name, 
  "slug":  slug.current
  },
  seo_description,
  seo_keywords,
}`);

  console.log(query);
  const options = { next: { revalidate: 30 } };

  const [posts, setPosts] = useState<SanityDocument[]>([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    client
      .fetch<SanityDocument[]>(
        query,
        {
          categoryName: categoryName,
        },
        options
      )
      .then((value) => {
        console.log(value);
        setPosts(value);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
        setPosts([]);
      });
  }, [query, categoryName]);

  return (
    <div>
      {loader ? (
        <div className="flex h-60 w-full items-center">
          <Loader />
        </div>
      ) : (
        <div className="!relative mx-auto mb-20 max-w-7xl px-4 sm:px-6 lg:px-8 ">
          <GroupTitle
            title={groupName}
            href={`/blog/category/${posts?.[0]?.category?.slug}`}
          />
          <Swiper
            navigation={{
              nextEl: ".swiper-button-next1", // Custom class for the next button
              prevEl: ".swiper-button-prev1", // Custom class for the prev button
            }}
            modules={[Navigation]}
            spaceBetween={20} // Adjust spacing between slides
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              0: {
                slidesPerView: 1,
              },
            }}
            className="trimuk_blog_slider !static "
          >
            {posts.map((item, index) => (
              <SwiperSlide key={index}>
                <BlogCard data={item} />
              </SwiperSlide>
            ))}
            {/* Custom navigation buttons */}
            <div className="swiper-button-prev1">
              <IcoSliderLeft />
            </div>
            <div className="swiper-button-next1">
              <IcoSliderLeft className="rotate-180" />
            </div>
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default OtherBlogs;
