/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(mainLayout)/blog/[slug]/page.jsx
// import { getPostBySlug } from '@/lib/api'
import { client } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";
import { notFound } from "next/navigation";
import BlogModal from "../__components/blog-modal";
import DynamicBlog from "./DynamicBlog";
import { POSTS_QUERY, query } from "./queries";

const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_HOST_URL || "http://localhost:3000";

export async function generateStaticParams() {
  const options = { next: { revalidate: 30 } };

  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  console.log({ myPost: posts });
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

async function getPostBySlug(slug: string) {
  console.log(slug);

  const params = { slug };
  const post = await client.fetch(query, params);
  return post;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({ params }: any) {
  const slug = params.slug;

  const post = await getPostBySlug(slug);
  console.log(post);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    locale: "en",
    type: "website",
    url: `${WEBSITE_URL}/blog/${slug}`,
    description: post.seo_description,
    alternates: {
      canonical: `${WEBSITE_URL}/blog/${slug}`,
    },
    robots: "index, follow",
    keywords: post.seo_keywords,
    category: post.cate,
    authors: [
      {
        name: post.author_name,
        url: post.author_url,
      },
    ],
    publishedTime: post.date,
    openGraph: {
      title: post.title,
      description: post.seo_description,
      url: `${WEBSITE_URL}/blog/${slug}`,
      siteName: "Sri Sri Radhe Siam",
      images: [
        {
          url: post.featureImg,
          width: 1200,
          height: 900,
          alt: post.title,
          type: "image/jpeg",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.seo_description,
      creator: "@nh",
      site: "@nh",
      images: [
        {
          url: post.featureImg,
          width: 1200,
          height: 900,
          alt: post.title,
          type: "image/jpeg",
        },
      ],
    },
    verification: {
      google: "google",
      yandex: "yandex",
      yahoo: "yahoo",
      bing: "bing",
    },
  };
}

export default async function Page({ params }: any) {
  const slug = params.slug;
  const post = await getPostBySlug(slug);
  console.log(post);

  if (!post?.content) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    description: post.seo_description,
    author: {
      "@type": "Person",
      name: post.author_name,
      url: post?.author_url,
    },
    image: post.featureImg,
    publisher: {
      "@type": "Organization",
      name: "Peacock India",
      logo: {
        "@type": "ImageObject",
        url: post.author_img,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${WEBSITE_URL}/blog/${slug}`,
    },
  };

  return (
    <section>
      <script
        key="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <DynamicBlog postData={post} />
      {post && <BlogModal />}
    </section>
  );
}
