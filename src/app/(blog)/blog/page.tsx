import { client } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";
import GroupedBasedBlogSlider from "./__components/category-based-blogs";

// ** import seo
import { blogJsonLd, blogMetadata } from "../blog/__meta/BlogsPage";
import { CATEGORY_QUERY } from "./__configs/category_queries";

export const metadata = blogMetadata;
const Blogs = async () => {
  const options = { next: { revalidate: 30 } };

  const allCategory = await client.fetch<SanityDocument[]>(
    CATEGORY_QUERY,
    {},
    options
  );

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJsonLd),
        }}
      />
      {allCategory?.length > 0 && (
        <GroupedBasedBlogSlider categories={allCategory} />
      )}
    </div>
  );
};

export default Blogs;
