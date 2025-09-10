import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BlogSkeleton = () => {
   return (
      <div className="bg-background">
         <div className=" max-w-7xl mx-auto">
            <Skeleton count={1} height={60} className="mt-8" />
            <Skeleton count={1} height={320} className="my-16" />
            <div className="flex flex-row flex-wrap justify-between">
               {Array.from({ length: 9 }).map((_, index) => (
                  <div
                     key={index}
                     className="w-full flex flex-col md:w-1/2 lg:w-1/3 p-4"
                  >
                     <Skeleton
                        count={1}
                        height={320}
                        className="max-h-[290px]"
                     />
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default BlogSkeleton;
