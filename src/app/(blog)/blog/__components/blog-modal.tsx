/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import IcoArrowRight from "../__icons/IcoArrowRight";
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";
import BlurImage from "./BlurImage";
import { Typography } from "./ui/Typography";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";

import blogBg from "../__assets/blog-modal-image.png";
import { useRouter } from "next/navigation";

import axios from "axios";
import toast from "react-hot-toast";
import { blogFontConfig } from "../__configs/font";
import IcoSiteLogo from "../__icons/IcoSiteLogo";
import { siteInfo } from "../__configs/siteInfo";
import { cn } from "../_libs/utils";

const closeIcon = (
   <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-red-500 p-2 text-xl text-white">
      <RxCross2 className="text-white md:text-lg" />
   </button>
);

const BlogModal = () => {
   const [isSuccessOpen, setIsSuccessOpen] = useState(false);
   const [isNewsLater, setIsNewsLater] = useState(true);
   const [email, setEmail] = useState("");
   const [loader, setLoader] = useState(false);
   // const [modalNumber, setModalNumber] = useState(0)
   // const [hasScrolled, setHasScrolled] = useState(false)
   const router = useRouter();

   const onSuccessClose = () => {
      setIsSuccessOpen(false);
   };

   useEffect(() => {
      const storedData = localStorage.getItem("new_letter");
      setIsSuccessOpen(true);
      if (storedData) {
         const parsedData = JSON.parse(storedData);
         if (parsedData.is_submitted) {
            setIsNewsLater(false);
         } else {
            setIsNewsLater(true);
         }
      } else {
         setIsNewsLater(true);
      }
      console.log(true);
   }, []);

   const onNewsLetterSubmit = async (email: string) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation
      if (!emailPattern.test(email.trim())) {
         alert("Please enter a valid email address.");

         return;
      }
      try {
         setLoader(true);
         const res = await axios.post(`/api/email-subscribe`, {
            email,
         });

         if (res.data.success) {
            setEmail("");
            toast.success("Email submitted successfully!!");
            localStorage.setItem(
               "new_letter",
               JSON.stringify({
                  is_submitted: true,
               })
            );
            setLoader(false);
            setIsNewsLater(false);
         } else {
            setLoader(false);
            toast.error(res.data.message);
         }
      } catch (err) {
         setLoader(false);
         toast.error(
            // @ts-ignore
            err.response.data.message || err.message || "Something went wrong"
         );
      }
   };

   return (
      <div className="blog-template-modal">
         <Modal
            open={isSuccessOpen}
            onClose={() => {
               onSuccessClose();
               // setModalNumber(1)
            }}
            center
            classNames={{
               modal: "customModal  !z-max",
            }}
            closeIcon={closeIcon}
         >
            <div className="relative mx-auto !rounded-3xl bg-white shadow-xl ">
               <div className="grid !h-full w-full grid-cols-1 gap-10 overflow-hidden md:grid-cols-2">
                  {/* Image container */}
                  <div className="hidden !h-full md:block">
                     <BlurImage
                        src={
                           blogBg.src ||
                           "https://content-guru-figma-plugin.s3.amazonaws.com/1bc6efab-0c57-4799-9e18-d3d3cfa40b3f.jpg"
                        }
                        alt="workshop image"
                        width={1920}
                        height={1080}
                        className="!h-full w-full scale-105 object-cover"
                     />
                  </div>

                  {/* Content container */}
                  <div className="flex h-full w-full flex-grow flex-col justify-center px-5 py-10 md:py-20">
                     <IcoSiteLogo />
                     <div className="flex flex-col gap-4">
                        <Typography
                           variant="Medium_H3"
                           className={cn(
                              `${blogFontConfig.title} mt-8 block text-[32px] text-dark_blue_`,
                              siteInfo.modalContentTitleClass
                           )}
                        >
                           {isNewsLater
                              ? siteInfo.newsLetterTitle
                              : siteInfo.discoverModalTitle}
                        </Typography>
                        <Typography
                           variant="Medium_H5"
                           className={cn(
                              blogFontConfig.subtitle,
                              siteInfo.modalContentDescriptionClass
                           )}
                        >
                           {isNewsLater
                              ? siteInfo.newsLetterDescription
                              : siteInfo.discoverModalDescription}
                        </Typography>
                     </div>

                     {isNewsLater ? (
                        <div className="!mt-10 flex flex-col items-start ">
                           <input
                              type="email"
                              className="w-full rounded-full border p-4 outline-none md:w-[360px]"
                              placeholder="Enter your email address"
                              onChange={(e) => setEmail(e.target.value)}
                              onKeyDown={(e) => {
                                 if (e.key === "Enter") {
                                    onNewsLetterSubmit(email);
                                 }
                              }}
                           />
                           <ButtonPrimary
                              onClick={() => {
                                 onNewsLetterSubmit(email);
                              }}
                              isLoading={loader}
                              content="Submit"
                              className="mt-6 w-full !py-4 md:max-w-[360px]"
                           />
                        </div>
                     ) : (
                        <div>
                           <div className="!mt-10 flex !flex-col lg:!flex-row  items-start lg:!items-center gap-4">
                              <ButtonPrimary
                                 content={siteInfo.primaryBtnContent}
                                 onClick={() =>
                                    window.open(
                                       siteInfo.primaryBtnLink,
                                       "_blank"
                                    )
                                 }
                                 className="!w-full lg:w-auto rounded-full bg-blog-primary px-4 sm:px-6 py-3 text-[14px] font-bold text-white duration-500 hover:opacity-90 hover:shadow-lg focus-visible:!outline-none focus-visible:!ring-0 md:px-8 md:text-base"
                              />
                              <ButtonSecondary
                                 content={siteInfo.secondaryBtnContent}
                                 onClick={() =>
                                    window.open(
                                       siteInfo.secondaryBtnLink,
                                       "_blank"
                                    )
                                 }
                                 className="!w-full lg:w-auto rounded-full border border-black bg-transparent px-4 sm:px-6 py-3 text-[14px] font-bold text-black duration-500 hover:!border-primary hover:!bg-white hover:bg-blog-primary hover:!text-blog-primary hover:text-white md:px-8 md:text-base"
                              />
                           </div>
                           <div className="mt-5 flex items-center group justify-start gap-1">
                              <Typography
                                 variant="Medium_H5"
                                 className="block cursor-pointer text-blog-discover  hover:text-blog-primary underline"
                                 onClick={() => {
                                    setIsSuccessOpen(false);
                                    router.push("/blog");
                                 }}
                              >
                                 Discover Blogs
                              </Typography>
                              <IcoArrowRight className="text-blog-discover group-hover:text-blog-primary" />
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </Modal>
      </div>
   );
};

export default BlogModal;
