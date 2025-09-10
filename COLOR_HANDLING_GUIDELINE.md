# Color Handling Guideline

This document provides comprehensive guidelines for color management in the blog
template project, covering color system setup, theme configuration, and best
practices for maintaining consistent color usage across light and dark modes.

## Table of Contents

1. [Color System Overview](#color-system-overview)
2. [Installation & Setup](#installation--setup)
3. [Color Token Configuration](#color-token-configuration)
4. [Light & Dark Mode Setup](#light--dark-mode-setup)
5. [Color Usage Patterns](#color-usage-patterns)
6. [Custom Color Implementation](#custom-color-implementation)
7. [Accessibility Considerations](#accessibility-considerations)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

## Color System Overview

The blog template uses a sophisticated color system built on:

- **OKLCH Color Space**: For better color consistency and perceptual uniformity
- **CSS Custom Properties**: For dynamic theme switching
- **Semantic Color Naming**: For maintainable and intuitive color usage
- **shadcn/ui Integration**: For consistent component styling

### Color Architecture

```
Color System
├── Base Colors (Primary, Secondary, Accent)
├── Semantic Colors (Success, Warning, Error, Info)
├── Neutral Colors (Background, Foreground, Muted)
├── Surface Colors (Card, Popover, Sidebar)
└── Interactive Colors (Hover, Focus, Active States)
```

## Installation & Setup

### 1. Install Required Dependencies

```bash
# Install Tailwind CSS v4
npm install -D tailwindcss@next @tailwindcss/postcss

# Install shadcn/ui dependencies
npm install class-variance-authority clsx tailwind-merge

# Install color manipulation utilities (optional)
npm install color2k
```

### 2. Initialize shadcn/ui

```bash
# Initialize shadcn/ui
npx shadcn@latest init

# Follow the prompts:
# ✓ Would you like to use TypeScript? Yes
# ✓ Which style would you like to use? New York
# ✓ Which color would you like to use as base color? Neutral
# ✓ Where is your global CSS file? src/app/globals.css
# ✓ Would you like to use CSS variables for colors? Yes
# ✓ Where is your tailwind.config.js located? (leave empty for auto-detection)
# ✓ Configure the import alias for components? @/components
# ✓ Configure the import alias for utils? @/lib/utils
```

### 3. Verify Configuration

Check that `components.json` is created with proper configuration:

```json
{
   "$schema": "https://ui.shadcn.com/schema.json",
   "style": "new-york",
   "rsc": true,
   "tsx": true,
   "tailwind": {
      "config": "",
      "css": "src/app/globals.css",
      "baseColor": "neutral",
      "cssVariables": true,
      "prefix": ""
   },
   "iconLibrary": "lucide",
   "aliases": {
      "components": "@/components",
      "utils": "@/lib/utils",
      "ui": "@/components/ui",
      "lib": "@/lib",
      "hooks": "@/hooks"
   }
}
```

## Color Token Configuration

### 1. CSS Variables Setup (`src/app/globals.css`)

```css
@import "tailwindcss";

:root {
   /* Base Colors - OKLCH for better color consistency */
   --background: oklch(0.9816 0.0017 247.839);
   --foreground: oklch(0.1649 0.0352 281.8285);

   /* Primary Colors */
   --primary: oklch(0.6726 0.2904 341.4084);
   --primary-foreground: oklch(1 0 0);

   /* Secondary Colors */
   --secondary: oklch(0.9595 0.02 286.0164);
   --secondary-foreground: oklch(0.1649 0.0352 281.8285);

   /* Muted Colors */
   --muted: oklch(0.9595 0.02 286.0164);
   --muted-foreground: oklch(0.1649 0.0352 281.8285);

   /* Accent Colors */
   --accent: oklch(0.8903 0.1739 171.269);
   --accent-foreground: oklch(0.1649 0.0352 281.8285);

   /* Destructive Colors */
   --destructive: oklch(0.6535 0.2348 34.037);
   --destructive-foreground: oklch(1 0 0);

   /* Border & Input Colors */
   --border: oklch(0.9205 0.0086 225.0878);
   --input: oklch(0.9205 0.0086 225.0878);
   --ring: oklch(0.6726 0.2904 341.4084);

   /* Card Colors */
   --card: oklch(1 0 0);
   --card-foreground: oklch(0.1649 0.0352 281.8285);

   /* Popover Colors */
   --popover: oklch(1 0 0);
   --popover-foreground: oklch(0.1649 0.0352 281.8285);

   /* Sidebar Colors */
   --sidebar: oklch(0.9595 0.02 286.0164);
   --sidebar-foreground: oklch(0.1649 0.0352 281.8285);
   --sidebar-primary: oklch(0.6726 0.2904 341.4084);
   --sidebar-primary-foreground: oklch(1 0 0);
   --sidebar-accent: oklch(0.8903 0.1739 171.269);
   --sidebar-accent-foreground: oklch(0.1649 0.0352 281.8285);
   --sidebar-border: oklch(0.9205 0.0086 225.0878);
   --sidebar-ring: oklch(0.6726 0.2904 341.4084);

   /* Chart Colors */
   --chart-1: oklch(0.6726 0.2904 341.4084);
   --chart-2: oklch(0.5488 0.2944 299.0954);
   --chart-3: oklch(0.8442 0.1457 209.2851);
   --chart-4: oklch(0.8903 0.1739 171.269);
   --chart-5: oklch(0.9168 0.1915 101.407);

   /* Typography */
   --font-sans: Outfit, sans-serif;
   --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
   --font-mono: Fira Code, monospace;

   /* Spacing & Sizing */
   --radius: 0.5rem;
   --spacing: 0.25rem;

   /* Shadows */
   --shadow-2xs: 0px 4px 8px -2px hsl(0 0% 0% / 0.05);
   --shadow-xs: 0px 4px 8px -2px hsl(0 0% 0% / 0.05);
   --shadow-sm:
      0px 4px 8px -2px hsl(0 0% 0% / 0.1), 0px 1px 2px -3px hsl(0 0% 0% / 0.1);
   --shadow:
      0px 4px 8px -2px hsl(0 0% 0% / 0.1), 0px 1px 2px -3px hsl(0 0% 0% / 0.1);
   --shadow-md:
      0px 4px 8px -2px hsl(0 0% 0% / 0.1), 0px 2px 4px -3px hsl(0 0% 0% / 0.1);
   --shadow-lg:
      0px 4px 8px -2px hsl(0 0% 0% / 0.1), 0px 4px 6px -3px hsl(0 0% 0% / 0.1);
   --shadow-xl:
      0px 4px 8px -2px hsl(0 0% 0% / 0.1), 0px 8px 10px -3px hsl(0 0% 0% / 0.1);
   --shadow-2xl: 0px 4px 8px -2px hsl(0 0% 0% / 0.25);
}

/* Dark Mode Colors */
.dark {
   --background: oklch(0.1649 0.0352 281.8285);
   --foreground: oklch(0.9513 0.0074 260.7315);
   --card: oklch(0.2542 0.0611 281.1423);
   --card-foreground: oklch(0.9513 0.0074 260.7315);
   --popover: oklch(0.2542 0.0611 281.1423);
   --popover-foreground: oklch(0.9513 0.0074 260.7315);
   --primary: oklch(0.6726 0.2904 341.4084);
   --primary-foreground: oklch(1 0 0);
   --secondary: oklch(0.2542 0.0611 281.1423);
   --secondary-foreground: oklch(0.9513 0.0074 260.7315);
   --muted: oklch(0.2542 0.0611 281.1423);
   --muted-foreground: oklch(0.6245 0.05 278.1046);
   --accent: oklch(0.8903 0.1739 171.269);
   --accent-foreground: oklch(0.1649 0.0352 281.8285);
   --destructive: oklch(0.6535 0.2348 34.037);
   --destructive-foreground: oklch(1 0 0);
   --border: oklch(0.3279 0.0832 280.789);
   --input: oklch(0.3279 0.0832 280.789);
   --ring: oklch(0.6726 0.2904 341.4084);
   --sidebar: oklch(0.1649 0.0352 281.8285);
   --sidebar-foreground: oklch(0.9513 0.0074 260.7315);
   --sidebar-primary: oklch(0.6726 0.2904 341.4084);
   --sidebar-primary-foreground: oklch(1 0 0);
   --sidebar-accent: oklch(0.8903 0.1739 171.269);
   --sidebar-accent-foreground: oklch(0.1649 0.0352 281.8285);
   --sidebar-border: oklch(0.3279 0.0832 280.789);
   --sidebar-ring: oklch(0.6726 0.2904 341.4084);
}

/* Theme Configuration */
@theme inline {
   --color-background: var(--background);
   --color-foreground: var(--foreground);
   --color-card: var(--card);
   --color-card-foreground: var(--card-foreground);
   --color-popover: var(--popover);
   --color-popover-foreground: var(--popover-foreground);
   --color-primary: var(--primary);
   --color-primary-foreground: var(--primary-foreground);
   --color-secondary: var(--secondary);
   --color-secondary-foreground: var(--secondary-foreground);
   --color-muted: var(--muted);
   --color-muted-foreground: var(--muted-foreground);
   --color-accent: var(--accent);
   --color-accent-foreground: var(--accent-foreground);
   --color-destructive: var(--destructive);
   --color-destructive-foreground: var(--destructive-foreground);
   --color-border: var(--border);
   --color-input: var(--input);
   --color-ring: var(--ring);
   --color-chart-1: var(--chart-1);
   --color-chart-2: var(--chart-2);
   --color-chart-3: var(--chart-3);
   --color-chart-4: var(--chart-4);
   --color-chart-5: var(--chart-5);
   --color-sidebar: var(--sidebar);
   --color-sidebar-foreground: var(--sidebar-foreground);
   --color-sidebar-primary: var(--sidebar-primary);
   --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
   --color-sidebar-accent: var(--sidebar-accent);
   --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
   --color-sidebar-border: var(--sidebar-border);
   --color-sidebar-ring: var(--sidebar-ring);

   --font-sans: var(--font-sans);
   --font-mono: var(--font-mono);
   --font-serif: var(--font-serif);

   --radius-sm: calc(var(--radius) - 4px);
   --radius-md: calc(var(--radius) - 2px);
   --radius-lg: var(--radius);
   --radius-xl: calc(var(--radius) + 4px);

   --shadow-2xs: var(--shadow-2xs);
   --shadow-xs: var(--shadow-xs);
   --shadow-sm: var(--shadow-sm);
   --shadow: var(--shadow);
   --shadow-md: var(--shadow-md);
   --shadow-lg: var(--shadow-lg);
   --shadow-xl: var(--shadow-xl);
   --shadow-2xl: var(--shadow-2xl);
}

/* Base Styles */
@layer base {
   * {
      @apply border-border outline-ring/50;
   }
   body {
      @apply bg-background text-foreground;
   }
}
```

### 2. Tailwind Configuration (if using standalone Tailwind)

If you're using Tailwind CSS without shadcn/ui, configure colors in
`tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         colors: {
            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",
            card: {
               DEFAULT: "hsl(var(--card))",
               foreground: "hsl(var(--card-foreground))",
            },
            popover: {
               DEFAULT: "hsl(var(--popover))",
               foreground: "hsl(var(--popover-foreground))",
            },
            primary: {
               DEFAULT: "hsl(var(--primary))",
               foreground: "hsl(var(--primary-foreground))",
            },
            secondary: {
               DEFAULT: "hsl(var(--secondary))",
               foreground: "hsl(var(--secondary-foreground))",
            },
            muted: {
               DEFAULT: "hsl(var(--muted))",
               foreground: "hsl(var(--muted-foreground))",
            },
            accent: {
               DEFAULT: "hsl(var(--accent))",
               foreground: "hsl(var(--accent-foreground))",
            },
            destructive: {
               DEFAULT: "hsl(var(--destructive))",
               foreground: "hsl(var(--destructive-foreground))",
            },
            border: "hsl(var(--border))",
            input: "hsl(var(--input))",
            ring: "hsl(var(--ring))",
            chart: {
               "1": "hsl(var(--chart-1))",
               "2": "hsl(var(--chart-2))",
               "3": "hsl(var(--chart-3))",
               "4": "hsl(var(--chart-4))",
               "5": "hsl(var(--chart-5))",
            },
         },
         borderRadius: {
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)",
         },
      },
   },
   plugins: [],
};

export default config;
```

## Light & Dark Mode Setup

### 1. Theme Provider Implementation

Create a theme provider for managing light/dark mode:

```tsx
// src/components/theme-provider.tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
   return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

### 2. Theme Toggle Component

```tsx
// src/components/theme-toggle.tsx
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
   const { setTheme, theme } = useTheme();

   return (
      <Button
         variant="outline"
         size="icon"
         onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
         <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
         <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
         <span className="sr-only">Toggle theme</span>
      </Button>
   );
}
```

### 3. Root Layout Integration

```tsx
// src/app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en" suppressHydrationWarning>
         <body>
            <ThemeProvider
               attribute="class"
               defaultTheme="system"
               enableSystem
               disableTransitionOnChange
            >
               {children}
            </ThemeProvider>
         </body>
      </html>
   );
}
```

## Color Usage Patterns

### 1. Semantic Color Usage

```tsx
// Background colors
<div className="bg-background">Main background</div>
<div className="bg-card">Card background</div>
<div className="bg-muted">Muted background</div>
<div className="bg-primary">Primary background</div>

// Text colors
<p className="text-foreground">Main text</p>
<p className="text-muted-foreground">Muted text</p>
<p className="text-primary">Primary text</p>
<p className="text-destructive">Error text</p>

// Border colors
<div className="border border-border">Default border</div>
<div className="border border-input">Input border</div>
<div className="border border-primary">Primary border</div>
```

### 2. Interactive States

```tsx
// Hover states
<button className="bg-primary hover:bg-primary/90 text-primary-foreground">
  Primary Button
</button>

// Focus states
<input className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />

// Active states
<button className="bg-primary active:bg-primary/80">Active Button</button>

// Disabled states
<button className="bg-muted text-muted-foreground disabled:opacity-50" disabled>
  Disabled Button
</button>
```

### 3. Component Color Patterns

```tsx
// Card component
<div className="bg-card text-card-foreground border border-border rounded-lg p-6">
  <h3 className="text-lg font-semibold">Card Title</h3>
  <p className="text-muted-foreground">Card content</p>
</div>

// Alert component
<div className="bg-destructive/10 text-destructive border border-destructive/20 rounded-md p-4">
  <p>Error message</p>
</div>

// Success component
<div className="bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20 rounded-md p-4">
  <p>Success message</p>
</div>
```

## Custom Color Implementation

### 1. Adding Custom Colors

To add custom colors to your theme:

```css
/* Add to :root in globals.css */
:root {
   /* Custom brand colors */
   --brand-primary: oklch(0.7 0.2 200);
   --brand-secondary: oklch(0.8 0.15 300);
   --brand-accent: oklch(0.9 0.1 100);

   /* Custom semantic colors */
   --success: oklch(0.6 0.2 140);
   --success-foreground: oklch(1 0 0);
   --warning: oklch(0.8 0.2 60);
   --warning-foreground: oklch(0.1 0 0);
   --info: oklch(0.7 0.2 240);
   --info-foreground: oklch(1 0 0);
}

.dark {
   --brand-primary: oklch(0.8 0.2 200);
   --brand-secondary: oklch(0.7 0.15 300);
   --brand-accent: oklch(0.9 0.1 100);

   --success: oklch(0.7 0.2 140);
   --success-foreground: oklch(0.1 0 0);
   --warning: oklch(0.9 0.2 60);
   --warning-foreground: oklch(0.1 0 0);
   --info: oklch(0.8 0.2 240);
   --info-foreground: oklch(0.1 0 0);
}

/* Add to @theme inline */
@theme inline {
   --color-brand-primary: var(--brand-primary);
   --color-brand-secondary: var(--brand-secondary);
   --color-brand-accent: var(--brand-accent);
   --color-success: var(--success);
   --color-success-foreground: var(--success-foreground);
   --color-warning: var(--warning);
   --color-warning-foreground: var(--warning-foreground);
   --color-info: var(--info);
   --color-info-foreground: var(--info-foreground);
}
```

### 2. Using Custom Colors

```tsx
// Use custom colors in components
<div className="bg-brand-primary text-white">Brand Primary</div>
<div className="bg-success text-success-foreground">Success Message</div>
<div className="bg-warning text-warning-foreground">Warning Message</div>
<div className="bg-info text-info-foreground">Info Message</div>
```

### 3. Color Palette Generator

Use tools like [TweakCN](https://tweakcn.com/) to generate custom color
palettes:

1. Visit [TweakCN.com](https://tweakcn.com/)
2. Choose your base color
3. Select light/dark mode preferences
4. Copy the generated CSS variables
5. Replace the default colors in your `globals.css`

## Accessibility Considerations

### 1. Color Contrast

Ensure proper contrast ratios for accessibility:

```css
/* Minimum contrast ratios */
/* Normal text: 4.5:1 */
/* Large text: 3:1 */
/* UI components: 3:1 */

/* Example of accessible color combinations */
:root {
   /* High contrast text */
   --foreground: oklch(0.15 0 0); /* Dark text on light background */
   --background: oklch(0.98 0 0); /* Light background */
}

.dark {
   --foreground: oklch(0.95 0 0); /* Light text on dark background */
   --background: oklch(0.15 0 0); /* Dark background */
}
```

### 2. Color Blindness Support

```tsx
// Don't rely solely on color to convey information
<div className="flex items-center gap-2">
  <div className="w-3 h-3 bg-destructive rounded-full"></div>
  <span className="text-destructive font-semibold">Error:</span>
  <span>Something went wrong</span>
</div>

// Use icons alongside colors
<div className="flex items-center gap-2">
  <AlertCircle className="w-4 h-4 text-destructive" />
  <span className="text-destructive">Error message</span>
</div>
```

### 3. Focus Indicators

```tsx
// Ensure focus indicators are visible
<button className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
  Accessible Button
</button>

// Custom focus styles
<input className="focus:ring-2 focus:ring-primary focus:border-primary" />
```

## Best Practices

### 1. Color Naming Conventions

```css
/* ✅ Good: Semantic naming */
--primary: oklch(0.7 0.2 200);
--primary-foreground: oklch(1 0 0);
--muted: oklch(0.9 0.02 0);
--muted-foreground: oklch(0.5 0.02 0);

/* ❌ Bad: Non-semantic naming */
--blue-500: oklch(0.7 0.2 200);
--gray-100: oklch(0.9 0.02 0);
```

### 2. Consistent Color Usage

```tsx
// ✅ Good: Use semantic colors consistently
<button className="bg-primary text-primary-foreground">Primary Action</button>
<button className="bg-secondary text-secondary-foreground">Secondary Action</button>

// ❌ Bad: Mixing color approaches
<button className="bg-blue-500 text-white">Primary Action</button>
<button className="bg-gray-200 text-gray-800">Secondary Action</button>
```

### 3. Color Testing

```tsx
// Test colors in both light and dark modes
<div className="bg-background text-foreground">
   <h1 className="text-primary">Primary Heading</h1>
   <p className="text-muted-foreground">Muted text content</p>
   <button className="bg-primary text-primary-foreground">Action Button</button>
</div>
```

### 4. Performance Optimization

```css
/* Use CSS custom properties for dynamic colors */
:root {
  --dynamic-color: oklch(0.7 0.2 200);
}

/* Avoid inline styles for static colors */
/* ❌ Bad */
<div style={{ backgroundColor: '#3b82f6' }}>

/* ✅ Good */
<div className="bg-primary">
```

## Troubleshooting

### Common Issues

#### 1. Colors Not Updating

**Problem**: Color changes not reflecting in the browser **Solutions**:

- Clear browser cache
- Check CSS variable syntax
- Verify theme class is applied correctly
- Ensure CSS is properly imported

#### 2. Dark Mode Not Working

**Problem**: Dark mode colors not applying **Solutions**:

- Check `.dark` class is applied to parent element
- Verify dark mode CSS variables are defined
- Ensure theme provider is properly configured
- Check for CSS specificity issues

#### 3. Color Contrast Issues

**Problem**: Poor accessibility due to low contrast **Solutions**:

- Use contrast checking tools
- Adjust lightness values in OKLCH
- Test with accessibility tools
- Provide alternative indicators (icons, text)

#### 4. Custom Colors Not Working

**Problem**: Custom colors not being recognized **Solutions**:

- Check CSS variable syntax
- Verify @theme inline configuration
- Ensure proper CSS import order
- Test with browser dev tools

### Debugging Tools

#### 1. Browser DevTools

- Inspect computed styles
- Check CSS variable values
- Verify color calculations

#### 2. Color Contrast Checkers

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors Contrast Checker](https://coolors.co/contrast-checker)

#### 3. Color Palette Tools

- [TweakCN](https://tweakcn.com/) - shadcn/ui color generator
- [OKLCH Color Picker](https://oklch.com/)
- [Coolors](https://coolors.co/) - Color palette generator

## File Structure

```
src/
├── app/
│   └── globals.css              # Color variables and theme configuration
├── components/
│   ├── theme-provider.tsx       # Theme context provider
│   ├── theme-toggle.tsx         # Theme switching component
│   └── ui/                      # shadcn/ui components with color integration
├── lib/
│   └── utils.ts                 # cn() utility for class merging
└── components.json              # shadcn/ui configuration
```

## Conclusion

This color handling system provides a robust, accessible, and maintainable
approach to color management in the blog template. By following these guidelines
and using the established patterns, developers can ensure consistent color usage
across light and dark modes while maintaining excellent accessibility and user
experience.

For questions or issues related to color handling, refer to this guide or check
the specific configuration files mentioned in each section.

## Additional Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [TweakCN Color Generator](https://tweakcn.com/)
- [OKLCH Color Space](https://oklch.com/)
- [WebAIM Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Tailwind CSS Color Documentation](https://tailwindcss.com/docs/customizing-colors)
