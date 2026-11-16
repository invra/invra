---
title: Creating a Tailwind Breakpoint Indicator
writer: InvraNet
summary: A simple way to always know your Tailwind breakpoints while developing.
tags:
  - Programming
  - Tailwind
  - Webdev
date: 2025-03-22T10:40Z
readTime: 6
lastRevisionDate: 2025-03-28T14:30:46Z
---

## Introduction

If you use Tailwind, you've probably needed to build a responsive UI that works across mobile, tablets, desktops, and other devices. Tailwind provides [responsive design utilities](https://tailwindcss.com/docs/responsive-design) to help, but remembering your breakpoints while tweaking layouts can be annoying.

So, why not add a simple, always-visible indicator that shows your current breakpoint? No more guessing.

---

## Solution

For React projects, especially in [Next.js](https://nextjs.org) and [Vite](https://vite.dev), a small reusable component can make this easy. The component will dynamically show which Tailwind breakpoint is active, only in development mode.

---

### **Step 1: Creating the Indicator Component**

First, create a new file: `src/components/tailwind-indicator.tsx`.

```tsx:src/components/TailwindIndicator.tsx
export default function TailwindIndicator() {
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="select-none fixed top-10 right-0 flex items-center justify-center w-6 h-6 p-3 m-8 font-mono text-xs text-white bg-gray-700 rounded-full sm:bg-pink-500 md:bg-orange-500 lg:bg-green-500 xl:bg-blue-500 2xl:bg-purple-500">
      <div className="block sm:hidden md:hidden lg:hidden xl:hidden">al</div>
      <div className="hidden sm:block md:hidden lg:hidden xl:hidden">sm</div>
      <div className="hidden sm:hidden md:block lg:hidden xl:hidden">md</div>
      <div className="hidden sm:hidden md:hidden lg:block xl:hidden">lg</div>
      <div className="hidden sm:hidden md:hidden lg:hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:block">2xl</div>
    </div>
  );
}
```

This component works by hiding and showing different `<div>` elements based on the active breakpoint. Each has a different background color for quick visual feedback.

---

### **Step 2: Adding It to Your Layout**

Now, import and use it in your layout file.

Find where your app's main layout is (for Next.js, this is usually `src/app/layout.tsx` or `src/pages/_app.tsx`). Import the indicator component:

```tsx:src/app/layout.tsx
import TailwindIndicator from "~/components/tailwind-indicator";
```

Then, place `<TailwindIndicator />` inside your `<body>` or anywhere global so it's always visible while developing.

---

## Done!

That's it. Now, whenever you're working in development mode, you'll see a small floating indicator showing the current
Tailwind breakpoint. No more guess-work, it's quick, and give you the visual feedback while you build your UI.
