import IcoBlogRightArrow from "../__icons/IcoBlogGroupArrow";
import { Typography } from "./ui/Typography";
import { cn } from "../_libs/utils";
import { blogFontConfig } from "../__configs/font";

interface IGroupTitle {
   title?: string;
   href?: string;
   id?: string;
}

const GroupTitle = ({ title, href, id }: IGroupTitle) => {
   return (
      <div className="pb-8" id={id}>
         <div className="flex items-center justify-between border-b border-border pb-4">
            <Typography
               variant="Bold_H3"
               className={cn("text-foreground capitalize ", blogFontConfig.title)}
            >
               {title}
            </Typography>
            <div className="flex items-center gap-2">
               <Typography
                  link={href}
                  variant="Medium_H5"
                  className={cn(
                     "capitalize text-primary hover:text-primary/90 ",
                     blogFontConfig.subtitle
                  )}
               >
                  View All
               </Typography>
               <IcoBlogRightArrow className="text-primary hover:text-primary/90" />
            </div>
         </div>
      </div>
   );
};

export default GroupTitle;
