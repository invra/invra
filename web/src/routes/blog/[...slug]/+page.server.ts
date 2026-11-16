import { error } from "@sveltejs/kit";
import { getAllPosts, getAllSlugs, getPost } from "#lib/server/posts.ts";
import type { EntryGenerator } from "./$types";

export const entries: EntryGenerator = () => getAllSlugs().map((slug) => ({ slug }));

export function load({ params }) {
  const post = getPost(params.slug);
  if (!post) error(404, "Not found");

  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === params.slug);

  return {
    slug: params.slug,
    meta: post.meta,
    html: post.html,
    prev: index > 0 ? posts[index - 1] : null,
    next: index < posts.length - 1 ? posts[index + 1] : null,
  };
}
