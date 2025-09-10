/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import NextImage from "next/image";
const Image = ({ src, alt, width = 500, height = 500, className }: any) => {
  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default Image;
