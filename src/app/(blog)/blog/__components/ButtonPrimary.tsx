import { blogFontConfig } from "../__configs/font";
import { cn } from "../_libs/utils";
import React, { ButtonHTMLAttributes, FC } from "react";

// Define custom props separately
interface CustomButtonProps {
  content: React.ReactNode;
  className?: string;
  isActive?: boolean;
  isLoading?: boolean;
}

// combining custom props with the standard button attributes
type ButtonProps = CustomButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

// Example spinner component (you might use a different one or style it accordingly)
const Spinner: FC = () => (
  <div
    className="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full"
    role="status"
  >
    <span className="visually-hidden" />
  </div>
);

const ButtonPrimary: FC<ButtonProps> = ({
  content,
  className,
  isActive = false,
  isLoading,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={cn(
        "rounded-full bg-blog-primary font-semibold text-white duration-500 hover:opacity-90 text-[14px] px-6 md:px-8 py-3 md:text-base",
        className,
        isActive ? "bg-gray-800" : undefined,
        isLoading ? "cursor-not-allowed" : "hover:shadow-lg",
        blogFontConfig.subtitle
      )}
      disabled={isLoading}
    >
      {isLoading ? <Spinner /> : content}
    </button>
  );
};

export default ButtonPrimary;
