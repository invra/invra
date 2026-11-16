<script lang="ts">
  import { Star, Code } from "@lucide/svelte";
  import Link from "#lib/components/Link.svelte";
  import type { Repo } from "#lib/types.ts";

  let { repo, onclose }: { repo: Repo; onclose: () => void } = $props();

  function onkeydown(e: KeyboardEvent) {
    if (e.key === "Escape") onclose();
  }
</script>

<svelte:window {onkeydown} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="fixed inset-0 bg-highest-drop flex justify-center items-center z-50"
  onmousedown={onclose}
>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="bg-highest-background rounded-lg p-6 w-full sm:w-96"
    onmousedown={(e) => e.stopPropagation()}
  >
    <div class="flex justify-between items-start select-none">
      <h2 class="text-xl font-semibold">{repo.name}</h2>
      <button class="text-muted" onclick={onclose} aria-label="Close">✕</button>
    </div>
    <p class="text-sm text-demuted mb-1">
      {repo.description || "This repository does not have an available description."}
    </p>
    <div class="block gap-2 text-muted select-none">
      <span class="flex gap-3"><Star width={15} /> {repo.star_count}</span>
      <span class="flex gap-3"><Code width={13} />{repo.language || "Unknown"}</span>
    </div>
    <div class="mt-4 flex justify-center">
      <Link href={repo.web_url} type="general">Go to Repository</Link>
    </div>
  </div>
</div>
