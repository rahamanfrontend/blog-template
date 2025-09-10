import { Typography } from "./ui/Typography";
import { cn } from "../_libs/utils";
import { SanityDocument } from "next-sanity";
import React, { useEffect, useState } from "react";
import { getAllTags } from "../utils/load-all-tags";

const AllTags = ({
   selectedTag,
   setSelectedTag,
}: {
   selectedTag: string;
   setSelectedTag: React.Dispatch<React.SetStateAction<string>>;
}) => {
   const [tags, setTags] = useState<SanityDocument[]>([]);
   const [loader, setLoader] = useState(false);

   useEffect(() => {
      const fetchTags = async () => {
         setLoader(true);
         try {
            const tags = await getAllTags();
            setTags(tags);
            setLoader(false);
         } catch (err) {
            setLoader(false);
         } finally {
            setLoader(false);
         }
      };
      fetchTags();
   }, []);

   return (
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-0 sm:px-6 lg:px-8">
         {/* <Typography
        variant='Medium_H3'
        className={cn('text-[31px]', blogFontConfig.title)}
      >
        All Tags
      </Typography> */}

         <div className="min-h-[40px]">
            {loader ? (
               <div className="flex flex-wrap gap-2 sm:gap-3">
                  {Array(14)
                     .fill(0)
                     .map((_, index) => (
                        <div
                           key={`tag-placeholder-${index}`}
                           className="h-8 w-20 animate-pulse rounded-full bg-blog-primary/10 sm:h-10 sm:w-28"
                        />
                     ))}
               </div>
            ) : (
               <>
                  {tags?.length > 0 && (
                     <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        {tags?.map((item, index) => (
                           <Typography
                              key={index}
                              variant="Regular_H6"
                              className={cn(
                                 `cursor-pointer rounded-full bg-blog-primary/10 px-3 py-1.5 text-blog-primary capitalize !text-base md:!text-base sm:px-4 sm:py-2`,
                                 item?.slug === selectedTag &&
                                    "bg-blog-primary !text-white"
                              )}
                              onClick={() => {
                                 if (selectedTag === item?.slug) {
                                    setSelectedTag("");
                                 } else {
                                    setSelectedTag(item?.slug);
                                 }
                              }}
                           >
                              {item?.name as string} ({item?.blogCount})
                           </Typography>
                        ))}
                     </div>
                  )}
               </>
            )}
         </div>
      </div>
   );
};

export default AllTags;
