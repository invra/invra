<script lang="ts">
  import { onMount } from "svelte";
  import RepoCard from "#lib/components/RepoCard.svelte";
  import RepoModal from "#lib/components/RepoModal.svelte";
  import type { LanguageData, Repo, SortType } from "#lib/types.ts";

  const CACHE_KEY = "projects_cache_v1";
  const SORT_CACHE_KEY = "projects_sort_v1";

  const sortOptions: { label: string; value: SortType }[] = [
    { label: "Lastest Commit", value: "last_committed" },
    { label: "First Commit", value: "first_committed" },
    { label: "A → Z", value: "a_z" },
    { label: "Z → A", value: "z_a" },
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
  ];

  const time = (s: string) => new Date(s).getTime();

  function sortRepositories(repos: Repo[], sort: SortType): Repo[] {
    return [...repos].sort((a, b) => {
      switch (sort) {
        case "last_committed":
          return time(b.first_commit_at) - time(a.first_commit_at);
        case "first_committed":
          return time(a.first_commit_at) - time(b.first_commit_at);
        case "a_z":
          return a.name.localeCompare(b.name);
        case "z_a":
          return b.name.localeCompare(a.name);
        case "newest":
          return time(b.created_at) - time(a.created_at);
        case "oldest":
          return time(a.created_at) - time(b.created_at);
        default:
          return 0;
      }
    });
  }

  async function fetchRepoMainLanguage(repoId: number): Promise<string> {
    try {
      const res = await fetch(`https://gitlab.com/api/v4/projects/${repoId}/languages`);
      const data: LanguageData = await res.json();
      if (!data || Object.keys(data).length === 0) return "No Language";
      const [mainLang, percentage] = Object.entries(data).reduce<[string, number]>(
        (acc, [lang, percent]) => (percent > acc[1] ? [lang, percent] : acc),
        ["Unknown", 0],
      );
      return `${mainLang} (${percentage.toFixed(2)}%)`;
    } catch (error) {
      console.error(`Error fetching languages for repo ${repoId}:`, error);
      return "Unknown";
    }
  }

  async function fetchRepoFirstCommitDate(repoId: number): Promise<string> {
    try {
      const res = await fetch(
        `https://gitlab.com/api/v4/projects/${repoId}/repository/commits?per_page=1&order=default`,
      );
      const commits = await res.json();
      return commits?.[0]?.created_at ?? "Unknown";
    } catch (error) {
      console.error(`Error fetching commits for repo ${repoId}:`, error);
      return "Unknown";
    }
  }

  let repositoryList = $state<Repo[]>([]);
  let selectedRepo = $state<Repo | null>(null);
  let loading = $state(true);
  let visibleCount = $state(6);
  let sortType = $state<SortType>("last_committed");

  const visibleRepos = $derived(sortRepositories(repositoryList, sortType).slice(0, visibleCount));
  const allShown = $derived(visibleCount >= repositoryList.length);

  onMount(() => {
    const savedSort = localStorage.getItem(SORT_CACHE_KEY) as SortType | null;
    if (savedSort) sortType = savedSort;

    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        repositoryList = JSON.parse(cached) as Repo[];
        loading = false;
      } catch {
        console.warn("Invalid cache, skipping");
      }
    }

    (async () => {
      try {
        const res = await fetch("/api/projects");
        const data: Repo[] = await res.json();
        const withDetails = await Promise.all(
          data.map(async (repo) => {
            const [language, firstCommitAt] = await Promise.all([
              fetchRepoMainLanguage(repo.id),
              fetchRepoFirstCommitDate(repo.id),
            ]);
            return { ...repo, language, first_commit_at: firstCommitAt };
          }),
        );
        repositoryList = withDetails;
        localStorage.setItem(CACHE_KEY, JSON.stringify(withDetails));
      } catch (error) {
        console.error("Error fetching repositories:", error);
      } finally {
        loading = false;
      }
    })();
  });
</script>

<svelte:head>
  <title>InvraNet's Website</title>
</svelte:head>

<div>
  <h1 class="text-4xl font-bold text-center text-primary-header">Projects</h1>

  <div class="xl:relative">
    <h1 class="text-3xl mt-8 font-bold text-center text-primary-header">Personal</h1>
    <p class="text-center mt-1 text-muted">These repos are publically sourced from my GitLab account.</p>

    <div class="xl:absolute top-0 right-0 flex py-4 xl:p-0 xl:pr-26 h-full items-center">
      <select
        class="mx-auto h-fit top-0 right-0 bg-input-clickable-background hover:bg-input-clickable-background-hover text-input-clickable-text text-center font-bold px-3 py-2 rounded-lg transition-all appearance-none cursor-pointer"
        bind:value={sortType}
        onchange={() => localStorage.setItem(SORT_CACHE_KEY, sortType)}
      >
        {#each sortOptions as option (option.value)}
          <option value={option.value}>{option.label}</option>
        {/each}
      </select>
    </div>
  </div>

  {#if loading && repositoryList.length === 0}
    <div class="text-center mt-6 text-muted flex flex-col justify-center items-center gap-2">
      <div class="text-primary-header three-dot" aria-hidden="true">
        <span></span><span></span><span></span>
      </div>
      <p>Loading repositories</p>
    </div>
  {:else}
    <div class="flex flex-wrap justify-center mt-6 gap-6 select-none">
      {#each visibleRepos as repo (repo.id)}
        <RepoCard {repo} onclick={() => (selectedRepo = repo)} />
      {/each}
    </div>

    <div class="flex justify-center mt-8">
      {#if !allShown}
        <button
          onclick={() => (visibleCount += 6)}
          class="bg-input-clickable-background hover:bg-input-clickable-background-hover text-input-clickable-text font-bold px-4 py-2 rounded-lg transition-all"
        >
          View More
        </button>
      {:else}
        <p class="text-muted text-center select-none">You’ve reached the end.</p>
      {/if}
    </div>
  {/if}

  {#if selectedRepo}
    <RepoModal repo={selectedRepo} onclose={() => (selectedRepo = null)} />
  {/if}
</div>
