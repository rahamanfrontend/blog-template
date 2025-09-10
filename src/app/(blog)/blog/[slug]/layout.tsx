import { ReactNode } from "react";
// import "@/scssStyles/style.scss";
// import "@/scssStyles/global.css";
import { cn } from "../_libs/utils";
import { poppins } from "../__configs/font";
const DynamicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={cn("blog-layout-custom-style", poppins.className)}>
      {children}
    </div>
  );
};

export default DynamicLayout;
