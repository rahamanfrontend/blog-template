/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import React from "react";

import img from "../__assets/not-found.svg";
import { Typography } from "../__components/ui/Typography";
import { blogFontConfig } from "../__configs/font";

const NotFound = () => {
   return (
      <main className="flex h-screen flex-col items-center justify-center gap-4 px-5 md:px-8">
         <Image src={img} alt="404 not found" />
         <Typography
            variant="Medium_H2"
            className={`${blogFontConfig.title} block text-dark_blue_`}
         >
            Page not found!
         </Typography>
         <Typography variant="Regular_H5" className="mt-6">
            The requested URL error was not found on this server.!
         </Typography>
      </main>
   );
};

export default NotFound;
