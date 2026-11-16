<script lang="ts">
  import type { Snippet } from "svelte";
  import type { LinkType } from "#lib/types.ts";
  import { interceptExternal, isExternal } from "#lib/external.svelte.ts";

  let {
    href,
    type,
    children,
  }: { href: string; type?: LinkType; children: Snippet } = $props();

  const styles: Record<LinkType, string> = {
    general:
      "bg-a-button-background hover:bg-a-button-background-hover text-a-button-text py-2 px-4 font-bold",
    youtube:
      "bg-custom-yt-background hover:bg-custom-yt-background-hover text-custom-yt-text py-2.5 px-6 font-bold",
    lastfm:
      "bg-custom-lastfm-background hover:bg-custom-lastfm-background-hover text-custom-lastfm-text py-2.5 px-6 font-bold",
    gitlab:
      "bg-custom-gitlab-background hover:bg-custom-gitlab-background-hover text-custom-gitlab-text py-2.5 px-6 font-bold",
    plain: "",
    "player-alts": "text-sm",
    "player-art": "overflow-hidden rounded-lg",
    "player-title": "font-bold",
  };

  const style = $derived(type ? styles[type] : "text-primary-link");
  const external = $derived(isExternal(href));

  function onclick(e: MouseEvent) {
    if (interceptExternal(href)) e.preventDefault();
  }
</script>

<a
  {href}
  {onclick}
  class="{style} duration-100 transition-colors text-center rounded-lg"
  target={external ? "_blank" : undefined}
  rel={external ? "noopener noreferrer" : undefined}
>
  {@render children()}
</a>
