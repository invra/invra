---
title: A Painstaking Switch from Remix to Next.js.
writer: InvraNet
summary: An explanation of the blood, sweat, tears, anger, and sanity all at stake to make this website.
tags:
  - Personal
  - Programming
  - Webdev
date: 2025-03-24T10:40Z
readTime: 6
lastRevisionDate: 2025-03-28T14:43:23Z
---

## What Made Me Do It?

For those wondering why I decided to do this, the main reason is the current issues with Remix-run.

---

### **Does This Mean I'm Ditching Remix?**

Hell no, and I need to emphasize that as much as possible. Unless Remix really pushes me away, I am <u>**not**</u> making the switch.

I have used Next.js in the past and didn't like it, and even now, I still don't. That's why I turned to Remix.
It offers a nice alternative to Next.js while being a bit more convenient (at least partially).
The main reason I've not moved to Next.js fully is because of Mr Man himself; [Vercel](https://vercel.com).

Yes, if you check with [Wappalyzer](https://www.wappalyzer.com), you'll see that I am using Vercel and have been for a long time.
This is mostly because Cloudflare Pages had **terrible** support for React and its frameworks the last time I tried (back in 2022).
At that time, I was attempting to deploy a Next.js site, and the experience was awful.

Funny enough while writing, a interesting Vulnerability was found because of neglagence in the Next.js developers forgetting to remove
something which bypassed all middleware, obviously im not affected no matter what, I do not use middleware, but I am on a later version
patching this Article from [Aus Gov Cyber](https://www.cyber.gov.au/about-us/view-all-content/alerts-and-advisories/nextjs-authentication-bypass-vulnerability-cve-2025-29927)
Are you shocked the Australian government wrote something about this? Yeah, same here.

---

## How Has the Transition Gone?

The transition has actually been pretty [smooth](https://l-ift.com/what-is-the-opposite-of-smooth)! That said, I have run into issues along the way.

The biggest challenge was that nothing was a simple "copy-and-paste"-my re-write **had to be re-written**. Doesn't sound fun at all... it wasn't.

One of my first tasks was figuring out how to get [Tailwind v4](https://tailwindcss.com/docs/installation) working with Remix,
since it ships with Tailwind v3 by default. I'll be writing an article on how to upgrade your Remix project to Tailwind v4 soon.

---

## How Many Hours Have I Spent on This?

Too many.

More than three-quarters of my time was spent on [this section of my website that you're viewing right now](#). Definitely time terribly spent.

I've logged **300 hours** in my editor (including AFK time) on this project. The actual Remix to Next.js transition? That only took **half a day**.

Sure, that might sound like a lot, but compared to 300 hours? It's nothing.
