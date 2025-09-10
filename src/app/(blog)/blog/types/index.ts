// types/sanity.ts

import { SanityDocument } from "next-sanity";

// Specific entity types
export interface Category {
   _id: string;
   name: string;
   slug: string;
   blogCount?: number;
}

export interface Tag {
   _id: string;
   name: string;
   slug: string;
}

export interface Author {
   author_name: string;
   author_img: string;
   username: string;
}

export interface Slug {
   current: string;
   _type: "slug";
}

// Blog type extending SanityDocument
export interface Blog extends SanityDocument {
   title: string;
   subtitle: string;
   featureImg: string;
   date: string;
   post_views: number;
   read_time: number;
   seo_description: string;
   seo_keywords: string[];
   slug: Slug;
   category: Category;
   tags: Tag[];
   author: Author;
}

// Component props
export interface GroupedBasedBlogSliderProps {
   categories: Category[];
}

export interface BlogHiddenRouteProps {
   posts: Blog[];
}

export interface SocialMedia {
   facebook?: string;
   youtube?: string;
   instagram?: string;
   linkedin?: string;
}

export interface Author extends SanityDocument {
   author_name: string;
   username: string;
   author_img: string;
   author_designation?: string;
   author_info?: string;
   author_bio?: string;
   author_url?: string;
   socialMedia?: SocialMedia;
}

// types.ts
export interface Tag extends SanityDocument {
   name: string;
   slug: string;
   blogCount?: number;
}
