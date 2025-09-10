// constants.ts

export const BASE_URL = process.env.NEXT_PUBLIC_WEBSITE_HOST_URL;
export const BLOG_URL = `${BASE_URL}/blog`;
export const META_IMAGE = `${BASE_URL}/seo.webp`;

export const SITE_NAME = "Sri Sri Radhe Siam";
export const TWITTER_HANDLE = "@exampleTwitterHandle"; // Replace with actual Twitter handle
export const LOCALE = "en_US";
export const TYPE = "website";

const title = `Blog || ${SITE_NAME}`;
const description =
   "Discover spiritual insights, devotion, and wisdom at the Sri Sri Radhe Siam Temple. Explore articles on Bhakti Yoga, Hindu traditions, and community service.";

const keywords = [
   "Sri Sri Radhe Siam",
   "Spiritual Enlightenment",
   "Bhakti Yoga",
   "Devotion",
   "Hindu Temple",
].join(", ");

export const blogMetadata = {
   title,
   locale: LOCALE,
   type: TYPE,
   description,
   robots: "index, follow",
   alternates: { canonical: BLOG_URL },
   keywords,
   openGraph: {
      title,
      description,
      url: BLOG_URL,
      siteName: SITE_NAME,
      locale: LOCALE,
      type: TYPE,
      images: [{ url: META_IMAGE, alt: title }],
   },
   twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: TWITTER_HANDLE,
      site: TWITTER_HANDLE,
      images: [{ url: META_IMAGE, alt: title }],
   },
};

export const blogJsonLd = {
   "@context": "https://schema.org/",
   "@type": TYPE,
   name: SITE_NAME,
   url: BLOG_URL,
};
