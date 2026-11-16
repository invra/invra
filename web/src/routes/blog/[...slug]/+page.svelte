<script lang="ts">
  import { ChevronLeft, ChevronRight } from "@lucide/svelte";
  import { fromNow } from "#lib/time.ts";
  import { interceptExternal } from "#lib/external.svelte.ts";
  import ImagePlaceholder from "#lib/components/ImagePlaceholder.svelte";

  let { data } = $props();

  const title = $derived(`${data.meta.title} - Invra's Blog`);

  /** Delegated handlers for the prerendered markdown HTML. */
  function onclick(e: MouseEvent) {
    const target = e.target as HTMLElement;

    const copy = target.closest<HTMLButtonElement>(".copy-button");
    if (copy) {
      const code = copy.closest<HTMLElement>(".code-block")?.dataset.code ?? "";
      navigator.clipboard.writeText(code).then(() => {
        const idle = copy.querySelector(".copy-idle");
        const done = copy.querySelector(".copy-done");
        idle?.classList.replace("flex", "hidden");
        done?.classList.replace("hidden", "flex");
        setTimeout(() => {
          idle?.classList.replace("hidden", "flex");
          done?.classList.replace("flex", "hidden");
        }, 2000);
      });
      return;
    }

    const link = target.closest<HTMLAnchorElement>("a[href]");
    if (link && interceptExternal(link.getAttribute("href") ?? "")) e.preventDefault();
  }

  function ondblclick(e: MouseEvent) {
    const code = (e.target as HTMLElement).closest<HTMLElement>(".inline-code");
    if (!code) return;
    const selection = window.getSelection()!;
    const range = document.createRange();
    range.selectNodeContents(code);
    selection.removeAllRanges();
    selection.addRange(range);
    navigator.clipboard.writeText(code.textContent ?? "");
    setTimeout(() => selection.removeAllRanges(), 100);
  }
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={data.meta.summary} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={data.meta.summary} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://invra.net/blog/{data.slug}" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:description" content={data.meta.summary} />
</svelte:head>

<div class="max-w-6xl mx-auto p-4">
  <div class="prose mx-auto">
    <a href="/blog" class="flex w-fit items-center justify-center gap-1 cursor-pointer text-demuted text-lg">
      <ChevronLeft />
      <span>Back to Home</span>
    </a>

    <div class="flex mt-4 gap-1 mb-2 select-none">
      {#each data.meta.tags ?? [] as tag, i (i)}
        <div class="bg-tags-background text-tags-text font-bold py-1 px-2 rounded-xl text-sm">{tag}</div>
      {/each}
    </div>

    <h1 class="text-4xl font-bold text-primary-header">{data.meta.title}</h1>

    <div class="w-full bg-card-secondary h-64 flex justify-center items-center rounded-lg overflow-hidden mt-4 mb-1">
      <div class="h-full w-full flex justify-center items-center hover:scale-115 transition-transform duration-300">
        {#if !data.meta.img}
          <ImagePlaceholder />
        {/if}
      </div>
    </div>

    <p class="mt-1 italic text-demuted">{data.meta.summary}</p>

    <div class="text-muted text-sm flex flex-wrap justify-between mb-4">
      <span>Written by: {data.meta.writer}</span>
      <span>Last Revised: {fromNow(data.meta.lastRevisionDate) || "INVALID DATE CONSTRUCT!"}</span>
    </div>

    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
    <article {onclick} {ondblclick}>
      {@html data.html}
    </article>

    <div class="flex w-full flex-wrap justify-between pt-10 select-none">
      {#if data.prev}
        <a
          href="/blog/{data.prev.slug}"
          class="py-2 px-4 w-86 bg-card-background rounded-lg hover:scale-105 hover:bg-input-interactive-hover-negative transition-all cursor-pointer flex items-center"
        >
          <ChevronLeft />
          <div class="flex flex-col ml-3 text-left">
            <span class="font-bold">Previous</span>
            <span class="text-sm">{data.prev.meta.title}</span>
          </div>
        </a>
      {:else}
        <div class="w-86"></div>
      {/if}

      {#if data.next}
        <a
          href="/blog/{data.next.slug}"
          class="py-2 px-4 w-86 bg-card-background rounded-lg hover:scale-105 hover:bg-input-interactive-hover-negative transition-all cursor-pointer flex flex-row-reverse items-center"
        >
          <ChevronRight />
          <div class="flex flex-col mr-3 text-right">
            <span class="font-bold">Next</span>
            <span class="text-sm">{data.next.meta.title}</span>
          </div>
        </a>
      {:else}
        <div class="w-86"></div>
      {/if}
    </div>
  </div>
</div>
