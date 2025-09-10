# Blog Template Implementation Guide

Quick setup guide for integrating the blog template into your Next.js project.

## Prerequisites

- Next.js 15+ project/ React Js
- Node.js 18+
- npm/yarn/pnpm

## 1. Install Dependencies

```bash
# Install Sanity
npm install sanity @sanity/vision next-sanity

# Install required UI dependencies
npm install class-variance-authority clsx tailwind-merge
npm install framer-motion lucide-react react-hot-toast
npm install react-loading-skeleton react-responsive-modal
npm install react-slick swiper

# Install development dependencies
npm install -D tailwindcss@next @tailwindcss/postcss
```

## 2. Setup Sanity

```bash
# Initialize Sanity in your project
npx create-sanity@latest --template clean --create-project "Your Blog" --dataset production

# Or add to existing project
npx sanity@latest init
```

## 3. Copy Template Files

Copy these folders to your project:

```
src/
├── app/(blog)/          # Blog pages and components
├── blog-styles/         # SCSS styles and animations
├── hooks/               # Custom React hooks
└── sanity/
    └── schemaTypes/     # Sanity content schemas
```

## 4. Configure Environment

Create `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token
```

## 5. Update Configuration

### Sanity Config (`sanity.config.ts`)

```typescript
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
   name: "default",
   title: "Your Blog",
   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
   plugins: [structureTool()],
   schema: { types: schemaTypes },
});
```

### Next.js Config (`next.config.ts`)

```typescript
const nextConfig = {
   images: {
      domains: ["cdn.sanity.io"],
   },
};

export default nextConfig;
```

## 6. Customize Content

### Site Information

Update `src/app/(blog)/blog/__configs/siteInfo.ts` to customize your blog's
content and branding:

```typescript
export const siteInfo = {
   title: "Your Blog Title",
   description: "Your blog description for SEO and social sharing",
   newsLetterTitle: "Subscribe to Our Newsletter",
   discoverModalTitle: "Discover More About Us",
   newsLetterDescription: "Stay updated with our latest content and insights.",
   discoverModalDescription: "Learn more about our mission and values.",
   modalContentTitleClass:
      "!leading-[1.35] md:!leading-[1.25] lg:!leading-[1.25]",
   modalContentDescriptionClass:
      "!leading-normal md:!leading-normal lg:!leading-normal",
   primaryBtnContent: "Learn More",
   secondaryBtnContent: "Contact Us",
   primaryBtnLink: "https://yoursite.com/about",
   secondaryBtnLink: "https://yoursite.com/contact",
};
```

### Typography Component

Update `src/app/(blog)/blog/__components/ui/Typography.tsx` for custom
typography styles.

### Color Scheme

Follow the [Color Handling Guideline](./COLOR_HANDLING_GUIDELINE.md) to
customize your color palette.

### Font Configuration

Follow the [Font Handling Guideline](./FONT_HANDLING_GUIDELINE.md) to configure
fonts.

## 7. Access Sanity Studio

Visit `http://localhost:3000/studio` to manage your blog content:

- Create blog posts
- Manage categories and tags
- Upload images
- Configure site settings

## 8. Deploy

### Vercel (Recommended)

```bash
# Deploy to Vercel
npx vercel

# Add environment variables in Vercel dashboard
```

### Other Platforms

Ensure environment variables are set in your hosting platform.

## Quick Start Checklist

- [ ] Dependencies installed
- [ ] Sanity configured
- [ ] Template files copied
- [ ] Environment variables set
- [ ] Sanity studio accessible
- [ ] Content created
- [ ] Deployed

## Support

- [Font Handling Guide](./FONT_HANDLING_GUIDELINE.md)
- [Color Handling Guide](./COLOR_HANDLING_GUIDELINE.md)
- [Tailwind & shadcn Guide](./TAILWIND_SHADCN_GUIDELINE.md)

## Troubleshooting

**Sanity Studio Not Loading?**

- Check environment variables
- Verify project ID and dataset
- Ensure Sanity project is active

**Styling Issues?**

- Verify Tailwind CSS is configured
- Check SCSS files are imported
- Ensure all dependencies are installed

**Build Errors?**

- Check TypeScript types
- Verify all imports are correct
- Ensure Sanity schemas are properly configured
