import { getAllPosts } from "#lib/server/posts.ts";

export function load() {
  return { posts: getAllPosts() };
}
