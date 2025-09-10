// import core package
import React, { ButtonHTMLAttributes, FC } from "react";

// import cn
import { cn } from "../_libs/utils";
import { blogFontConfig } from "../__configs/font";

// Define custom props separately
interface CustomButtonProps {
   content: React.ReactNode;
   className?: string;
   isActive?: boolean;
}

// combining custom props with the standard button attributes
type ButtonProps = CustomButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonSecondary: FC<ButtonProps> = ({
   content,
   className,
   isActive = false,
   ...rest // Capture the rest of the button native props
}) => {
   return (
      <button
         {...rest} // Spread the rest of the native button props here
         className={cn(
            "rounded-full border border-border bg-transparent font-semibold text-foreground duration-500 hover:bg-primary hover:text-primary-foreground text-[14px] px-6 md:px-8 py-3 md:text-base",
            { "bg-primary text-primary-foreground": isActive },
            className,
            blogFontConfig.subtitle
         )}
      >
         {content}
      </button>
   );
};

export default ButtonSecondary;
