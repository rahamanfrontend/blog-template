import { Poppins } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins]",
  weight: ["300", "400", "500", "700"],
});

export const blogFontConfig = {
  title: poppins.className,
  subtitle: poppins.className,
};
