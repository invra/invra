<script lang="ts">
  import type { Repo } from "#lib/types.ts";
  import { dayjs, fromNow } from "#lib/time.ts";
  import CalendarIcon from "#lib/components/CalendarIcon.svelte";
  import ImagePlaceholder from "#lib/components/ImagePlaceholder.svelte";

  let { repo, onclick }: { repo: Repo; onclick: () => void } = $props();

  let hovered = $state(false);
  const tags = $derived([...repo.topics].sort().slice(0, 3));
  const [namespaceName = "", repoName = ""] = $derived(repo.path_with_namespace.split("/"));
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
      <button
        class="bg-a-button-background text-a-button-text select-none px-4 py-2 rounded-md font-bold transition-all duration-300 hover:bg-a-button-background-hover shadow-md {hovered
          ? ''
          : 'translate-y-4'}"
        {onclick}
      >
        More Info
      </button>
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
      <div class="flex text-muted items-end">
        <CalendarIcon />
        <span class="text-sm font-bold">{dayjs(repo.created_at).format("MMM D, YYYY")}</span>
      </div>
    </div>

    <div class="flex-grow inline-flex flex-col">
      <div class="flex items-center mb-2 text-primary-paragraph">
        <h3 class="text-xl select-text inline font-bold">{namespaceName}</h3>
        <svg height="16" stroke-linejoin="round" viewBox="0 0 16 16" width="16">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.01526 15.3939L4.3107 14.7046L10.3107 0.704556L10.6061 0.0151978L11.9849 0.606077L11.6894 1.29544L5.68942 15.2954L5.39398 15.9848L4.01526 15.3939Z"
            fill="currentColor"
          />
        </svg>
        <h3 class="text-demuted select-text font-bold text-xl inline-block min-w-32">{repoName}</h3>
      </div>
      <p class="text-muted select-text text-sm mb-3 inline-block min-w-32 max-w-102">
        {repo.description || "This repository does not have an available description."}
      </p>
    </div>

    <div class="flex select-none justify-between items-center text-muted text-sm">
      <div class="flex items-center">
        <span>{repo.language}</span>
      </div>
      <div>Last activity {fromNow(repo.first_commit_at) || "Unknown"}</div>
    </div>
  </div>
</div>
