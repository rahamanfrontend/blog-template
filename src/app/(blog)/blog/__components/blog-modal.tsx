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
   <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-destructive p-2 text-xl text-destructive-foreground">
      <RxCross2 className="text-destructive-foreground md:text-lg" />
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
               modal: "customModal !min-w-[85%] !p-0 !rounded-lg !max-w-[85%] lg:!min-w-[65%] lg:!max-w-[65%]  !z-max",
            }}
            closeIcon={closeIcon}
         >
            <div className="relative mx-auto !rounded-3xl bg-card shadow-xl ">
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
                              `${blogFontConfig.title} mt-8 block text-[32px] text-foreground`,
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
                              className="w-full rounded-full border border-input bg-background p-4 outline-none md:w-[360px]"
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
                                 className="!w-full lg:w-auto rounded-full bg-primary px-4 sm:px-6 py-3 text-[14px] font-bold text-primary-foreground duration-500 hover:opacity-90 hover:shadow-lg focus-visible:!outline-none focus-visible:!ring-0 md:px-8 md:text-base"
                              />
                              <ButtonSecondary
                                 content={siteInfo.secondaryBtnContent}
                                 onClick={() =>
                                    window.open(
                                       siteInfo.secondaryBtnLink,
                                       "_blank"
                                    )
                                 }
                                 className="!w-full lg:w-auto rounded-full border border-border bg-transparent px-4 sm:px-6 py-3 text-[14px] font-bold text-foreground duration-500 hover:border-primary hover:bg-primary hover:text-primary-foreground md:px-8 md:text-base"
                              />
                           </div>
                           <div className="mt-5 flex items-center group justify-start gap-1">
                              <Typography
                                 variant="Medium_H5"
                                 className="block cursor-pointer text-muted-foreground hover:text-primary underline"
                                 onClick={() => {
                                    setIsSuccessOpen(false);
                                    router.push("/blog");
                                 }}
                              >
                                 Discover Blogs
                              </Typography>
                              <IcoArrowRight className="text-muted-foreground group-hover:text-primary" />
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
