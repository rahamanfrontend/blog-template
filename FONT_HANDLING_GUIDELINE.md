# Font Handling Guideline

This document provides comprehensive guidelines for font handling in the blog
template project, covering configuration, usage patterns, and best practices.

## Table of Contents

1. [Font Configuration](#font-configuration)
2. [Font Families](#font-families)
3. [Font Weights](#font-weights)
4. [Font Sizes](#font-sizes)
5. [Typography System](#typography-system)
6. [Usage Patterns](#usage-patterns)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

## Font Configuration

### Primary Font Configuration

The project uses **Poppins** as the primary font family, configured in multiple
locations:

#### 1. Next.js Font Configuration (`src/app/(blog)/blog/__configs/font.ts`)

```typescript
import { Poppins } from "next/font/google";

export const poppins = Poppins({
   subsets: ["latin"],
   variable: "--font-poppins",
   weight: ["300", "400", "500", "700"],
});

export const blogFontConfig = {
   title: poppins.className,
   subtitle: poppins.className,
};
```

#### 2. Root Layout Configuration (`src/app/layout.tsx`)

```typescript
const poppins = Poppins({
   subsets: ["latin"],
   weight: ["400", "500", "600", "700"],
   variable: "--font-poppins",
});

// Applied to body element
<body className={`${poppins.className} font-poppins antialiased`}>
```

#### 3. CSS Variables (`src/blog-styles/default/_variables.scss`)

```scss
--font-primary: Poppins, "Poppins Fallback" !important;
--secondary-font: Poppins, "Poppins Fallback" !important;
--font-awesome: "Font Awesome 5 Pro";
```

## Font Families

### Primary Fonts

1. **Poppins** - Main font family for all text content
   - Used for headings, body text, and UI elements
   - Configured with weights: 300, 400, 500, 700
   - Fallback: "Poppins Fallback"

2. **Outfit** - Secondary font (configured in globals.css)
   - Used for specific UI components
   - CSS variable: `--font-sans`

3. **Ubuntu** - Alternative body font
   - Applied in `src/blog-styles/global.css`
   - Used for specific styling contexts

### Supporting Fonts

1. **Font Awesome 5 Pro** - Icon font
   - Used for icons and decorative elements
   - CSS variable: `--font-awesome`

2. **Fira Code** - Monospace font
   - Used for code blocks and technical content
   - CSS variable: `--font-mono`

3. **Courier 10 Pitch** - Alternative monospace
   - Used for `<pre>` and `<var>` elements

## Font Weights

### Weight Variables (SCSS)

```scss
// Primary font weights
--p-light: 300;
--p-regular: 400;
--p-medium: 500;
--p-semi-bold: 600;
--p-bold: 700;
--p-extra-bold: 800;
--p-black: 900;

// Secondary font weights
--s-light: 300;
--s-regular: 400;
--s-medium: 500;
--s-bold: 700;
--s-black: 900;
```

### Tailwind CSS Classes

- `font-light` (300)
- `font-normal` (400)
- `font-medium` (500)
- `font-semibold` (600)
- `font-bold` (700)

## Font Sizes

### Size Variables (SCSS)

```scss
--font-size-b1: 18px; // Primary body text
--font-size-b2: 16px; // Secondary body text
--font-size-b3: 14px; // Small text
--font-size-b4: 12px; // Extra small text

// Heading sizes
--h1: 44px;
--h2: 36px;
--h3: 30px;
--h4: 24px;
--h5: 18px;
--h6: 16px;
```

### Responsive Typography

The project uses responsive font sizes with mobile-first approach:

```typescript
// Example from Typography component
fontSizeClass = "text-[40px] md:text-[62px]"; // H1
fontSizeClass = "text-[32px] md:text-[49px]"; // H2
fontSizeClass = "text-[24px] md:text-[39px]"; // H3
```

## Typography System

### Typography Component (`src/app/(blog)/blog/__components/ui/Typography.tsx`)

The project includes a comprehensive Typography component with predefined
variants:

#### Available Variants

- **Bold_H1** to **Bold_H7** - Bold headings
- **SemiBold_H1** to **SemiBold_H7** - Semi-bold headings
- **Medium_H1** to **Medium_H7** - Medium weight headings
- **Regular_H1** to **Regular_H7** - Regular weight headings

#### Usage Example

```tsx
<Typography
   variant="Medium_H1"
   className={`${blogFontConfig.title} block leading-tight text-primary-foreground`}
>
   Heading Text
</Typography>
```

### Font Configuration Usage

```tsx
// In components
import { blogFontConfig } from "../__configs/font";

// Apply font classes
className={cn("font-bold text-foreground", blogFontConfig.title)}
className={cn("text-xl font-medium", blogFontConfig.subtitle)}
```

## Usage Patterns

### 1. Component-Level Font Application

#### Blog Cards

```tsx
<h3
   className={cn(
      blogFontConfig.title,
      "!mt-1 line-clamp-2 !font-medium text-foreground"
   )}
>
   Blog Title
</h3>
```

#### Post Content

```tsx
<div className={cn("axil-post-details", blogFontConfig.subtitle)}>
   {/* Post content */}
</div>
```

### 2. CSS Class Patterns

#### Tailwind Classes

```css
/* Common patterns found in the codebase */
font-inter text-base font-semibold
text-3xl md:text-4xl text-foreground font-bold font-inter
text-lg md:text-xl font-medium text-muted-foreground font-inter
```

#### SCSS Classes

```scss
.title {
   @apply text-3xl md:text-4xl text-foreground font-bold font-inter;
}

.subtitle {
   @apply text-lg md:text-xl font-medium text-muted-foreground font-inter;
}
```

### 3. Font Weight Application

#### Inline Styles

```tsx
className = "font-bold text-foreground";
className = "text-xl font-medium";
className = "text-base font-normal";
```

#### CSS Variables

```scss
font-weight: var(--p-medium);
font-weight: var(--s-bold);
```

## Best Practices

### 1. Font Loading

- Use Next.js `next/font/google` for optimal font loading
- Configure font subsets to include only needed characters
- Use `antialiased` class for better font rendering

### 2. Font Fallbacks

- Always provide fallback fonts in CSS variables
- Use system fonts as fallbacks for better performance

### 3. Responsive Typography

- Use mobile-first approach for font sizes
- Implement responsive breakpoints consistently
- Test font sizes across different devices

### 4. Font Weight Hierarchy

- Use consistent weight patterns across similar elements
- Maintain visual hierarchy with appropriate weight differences
- Avoid using too many different weights in one design

### 5. Performance Considerations

- Load only necessary font weights
- Use font-display: swap for better loading experience
- Consider using font preloading for critical fonts

### 6. Accessibility

- Ensure sufficient contrast between text and background
- Use appropriate line heights for readability
- Test with screen readers

## Troubleshooting

### Common Issues

#### 1. Font Not Loading

- Check if font is properly imported in layout.tsx
- Verify font configuration in font.ts
- Ensure CSS variables are correctly defined

#### 2. Font Weight Not Applied

- Check if the weight is included in the font configuration
- Verify Tailwind CSS classes are correct
- Ensure SCSS variables are properly defined

#### 3. Font Size Issues

- Check responsive breakpoints
- Verify Typography component variant usage
- Ensure CSS variables are correctly applied

#### 4. Font Rendering Issues

- Add `antialiased` class to body element
- Check font-smoothing properties
- Verify font fallbacks are working

### Debugging Steps

1. **Check Browser DevTools**
   - Inspect computed styles
   - Verify font-family declarations
   - Check for font loading errors

2. **Verify Configuration**
   - Check font imports in layout.tsx
   - Verify font configuration in font.ts
   - Ensure CSS variables are defined

3. **Test Font Loading**
   - Use Network tab to check font loading
   - Verify font files are accessible
   - Check for CORS issues

## File Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root font configuration
│   └── (blog)/blog/
│       ├── __configs/
│       │   └── font.ts              # Blog-specific font config
│       └── __components/
│           └── ui/
│               └── Typography.tsx   # Typography component
├── blog-styles/
│   ├── global.css                   # Global font styles
│   └── default/
│       ├── _variables.scss          # Font variables
│       └── _typography.scss         # Typography styles
└── app/
    └── globals.css                  # CSS variables and font definitions
```

## Conclusion

This font handling system provides a robust, scalable approach to typography in
the blog template. By following these guidelines and using the established
patterns, developers can maintain consistency and ensure optimal font
performance across the application.

For questions or issues related to font handling, refer to this guide or check
the specific configuration files mentioned in each section.
