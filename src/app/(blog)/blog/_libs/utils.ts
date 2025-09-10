/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const SortingByDate = function (posts: any[]) {
  // Sort the posts by date in descending order
  //@ts-ignore
  const desc = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  return desc;
};

export const slugify = function (text: string) {
  return text
    ?.toString()
    ?.toLowerCase()
    ?.replace(/\s+/g, "-") // Replace spaces with -
    ?.replace(/[^\w-]+/g, "") // Remove all non-word chars
    ?.replace(/--+/g, "-") // Replace multiple - with single -
    ?.replace(/^-+/, "") // Trim - from start of text
    ?.replace(/-+$/, ""); // Trim - from end of text
};

export const addLinkAttributes = (htmlString: string) => {
  const modifiedHtmlString = htmlString.replace(
    /<a(.*?)>/g,
    '<a$1 target="_blank" rel="noopener noreferrer">'
  );

  return modifiedHtmlString;
};

export const applyBasePathToLinks = (
  content: string,
  altContent = "feedback sync"
) => {
  const basePathLink =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_BASEPATH ?? ""
      : "";

  // Regular expression to match <img> tags
  const imgTagRegex = /<img(.*?)src=["'](.*?)["'](.*?)>/gi;

  // Replace the image src and add alt attribute
  const updatedContent = content.replace(
    imgTagRegex,
    (match, p1, imgLink, alt) => {
      alt = alt.trim();

      const updatedAlt =
        alt === 'alt=""' || alt === "alt=''" ? `alt="${altContent}"` : alt;

      const updatedSrc = `${basePathLink}${imgLink}`;

      return `<img${p1} src="${updatedSrc}" ${updatedAlt}>`;
    }
  );

  return updatedContent;
};

export function removeDuplicates(originalArray: [], prop: any) {
  const newArray = [];
  const lookupObject = {};

  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (i in lookupObject) {
    // @ts-ignore
    newArray.push(lookupObject[i]);
  }
  return newArray;
}
