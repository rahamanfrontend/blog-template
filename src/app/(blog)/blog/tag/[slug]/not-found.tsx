import Image from "next/image";
import React from "react";

import img from "../../__assets/not-found.svg";
import { Typography } from "../../__components/ui/Typography";
import { blogFontConfig } from "../../__configs/font";

const Page = () => {
   return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 sm:px-6 md:px-8 lg:px-10">
         <div className="flex flex-col items-center justify-center gap-4 w-full lg:w-1/2">
            <Image
               src={img}
               alt="image"
               className="w-full max-w-[250px] md:max-w-[300px] lg:max-w-1/2 mx-auto"
            />
         </div>
         <Typography
            variant="Medium_H2"
            className={`${blogFontConfig.title} block text-center text-dark_blue_ text-2xl sm:text-3xl md:text-4xl`}
         >
            Tag Not Found
         </Typography>
         <Typography
            variant="Regular_H5"
            className="mt-4 mb-8 text-center text-base sm:text-lg md:text-xl max-w-lg"
         >
            The tag you are looking for does not exist. Please check the URL or
            try another tag.
         </Typography>
      </main>
   );
};

export default Page;
