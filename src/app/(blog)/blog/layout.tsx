// import Banner from "@/components/Banner";

import { ReactNode } from "react";
import "@/blog-styles/style.scss";
import "@/blog-styles/global.css";
import { cn } from "./_libs/utils";
import { poppins } from "./__configs/font";
const IskconBlogLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={cn("blog-layout-custom-style", poppins.className)}>
      {children}
      {/* <Banner /> */}
    </div>
  );
};

export default IskconBlogLayout;
