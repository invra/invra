<script lang="ts">
  import type { PageEntry } from "#lib/types.ts";
  import { fromNow } from "#lib/time.ts";
  import CalendarIcon from "#lib/components/CalendarIcon.svelte";
  import ImagePlaceholder from "#lib/components/ImagePlaceholder.svelte";

  let { page }: { page: PageEntry } = $props();

  let hovered = $state(false);
  let showTime = $state(false);
  const tags = $derived(page.meta.tags ?? []);
  const date = $derived(page.meta.date ? new Date(page.meta.date) : null);
</script>

<div
  class="relative rounded-lg bg-card-background text-white transition-all duration-300 shadow-sm overflow-hidden min-w-64 min-h-72 w-115 flex flex-col"
  role="group"
  onmouseover={() => (hovered = true)}
  onmouseout={() => (hovered = false)}
  onfocus={() => (hovered = true)}
  onblur={() => (hovered = false)}
>
  <div
    class="relative bg-card-secondary text-zinc-800 h-40 flex items-center justify-center rounded-t-lg transition-all duration-300"
  >
    <ImagePlaceholder />
    <div
      class="absolute inset-0 flex items-center justify-center bg-card-secondary-complementary/70 transition-all duration-300 ease-in-out transform {hovered
        ? 'opacity-100'
        : 'opacity-0'}"
    >
      <a
        class="bg-a-button-background text-a-button-text select-none px-4 py-2 rounded-md font-bold transition-all duration-300 hover:bg-a-button-background-hover shadow-md {hovered
          ? ''
          : 'translate-y-4'}"
        href="/blog/{page.slug}"
      >
        Read Article
      </a>
    </div>
  </div>

  <div class="p-4 flex flex-col flex-grow">
    <div class="flex flex-wrap gap-2 select-none justify-between items-center mb-2">
      <div class="flex gap-1 mr-6">
        {#each tags as tag, i (i)}
          <div class="bg-tags-background text-tags-text font-bold py-1 px-2 rounded-xl text-sm">
            {tag}
          </div>
        {/each}
      </div>
      <div class="flex text-muted items-center">
        <CalendarIcon />
        {#if date}
          <button class="text-sm font-bold cursor-pointer" onclick={() => (showTime = !showTime)}>
            {showTime
              ? date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })
              : date.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}
          </button>
        {:else}
          <span class="text-sm text-zinc-700 font-bold">Unknown Date</span>
        {/if}
      </div>
    </div>

    <div class="flex-grow inline-flex flex-col">
      <h3 class="text-xl text-primary-paragraph font-bold mb-2 inline-block min-w-32">
        {page.meta.title}
      </h3>
      <p class="text-muted text-sm mb-3 inline-block min-w-32 max-w-102">
        {page.meta.summary || "No description available."}
      </p>
    </div>

    <div class="flex select-none justify-between items-center text-muted text-sm">
      <div class="flex items-center">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {page.meta.readTime || "Unknown"} min read
      </div>
      <div>Last revised {fromNow(page.meta.lastRevisionDate) || "Unknown"}</div>
    </div>
  </div>
</div>
