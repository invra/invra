<script lang="ts">
  import InfoTable from "#lib/components/about/InfoTable.svelte";
  import SongItem from "#lib/components/about/SongItem.svelte";
  import NowPlayingSkeleton from "#lib/components/about/NowPlayingSkeleton.svelte";
  import Computers from "#lib/data/Computers.ts";
  import Networking from "#lib/data/Networking.ts";
  import Softwares from "#lib/data/Softwares.ts";
  import Languages from "#lib/data/Languages.ts";
  import FavFoods from "#lib/data/FavFoods.ts";
  import type { LastFmResponse, Song } from "#lib/types.ts";

  const tabs = ["Devices", "Networking", "Software", "Programming Stack", "Favorite Food"] as const;

  let activeTab = $state<(typeof tabs)[number]>(tabs[0]);
  let songs = $state<Song[]>([]);
  let songsLoading = $state(true);

  async function fetchSongs() {
    try {
      const res = await fetch("/api/tracks");
      if (!res.ok) throw new Error("Failed to fetch songs");
      const data: LastFmResponse = await res.json();
      const next: Song[] = (data.recenttracks?.track ?? []).map((track) => ({
        artist: track.artist["#text"],
        title: track.name,
        album: track.album["#text"],
        url: track.url,
        image: track.image.find((img) => img.size === "extralarge")?.["#text"] || "",
        nowPlaying: track["@attr"]?.nowplaying === "true",
      }));
      if (JSON.stringify(next) !== JSON.stringify(songs)) songs = next;
    } catch (err) {
      console.error(err);
    } finally {
      songsLoading = false;
    }
  }

  $effect(() => {
    fetchSongs();
    const interval = setInterval(fetchSongs, 10000);
    return () => clearInterval(interval);
  });
</script>

<svelte:head>
  <title>InvraNet's Website</title>
</svelte:head>

<main class="pb-10 flex flex-col items-center overflow-x-auto">
  <h1 class="text-4xl font-bold text-center text-primary-header">About Me</h1>
  <div
    class="inline-flex flex-wrap justify-center p-2 mt-4 bg-card-background backdrop-blur-md bg-opacity-45 rounded-md mx-auto gap-2"
  >
    {#each tabs as tab (tab)}
      <button
        onclick={() => (activeTab = tab)}
        class="px-3 py-1 rounded-md {activeTab === tab
          ? 'bg-diiae-background font-bold text-diiae-foreground'
          : 'cursor-pointer hover:bg-input-interactive-hover-negative'}"
      >
        {tab}
      </button>
    {/each}
  </div>
  <div class="mt-4 w-full max-w-280 overflow-x-auto bg-card-background rounded-lg">
    <div class="p-4">
      {#if activeTab === "Devices"}
        <h2 class="text-2xl font-semibold mb-4 text-center">Devices</h2>
        <InfoTable
          data={Computers}
          columns={[
            { header: "Brand", accessor: (d) => d.brand },
            { header: "Model", accessor: (d) => d.model },
            { header: "OS", accessor: (d) => d.operatingSystem || "N/A" },
            { header: "Price", accessor: (d) => `A$${d.price}` },
            { header: "Description", accessor: (d) => d.description },
            {
              header: "Link",
              accessor: (d) => ({ href: d.url || "#", label: d.url ? "View" : "Unknown Link" }),
            },
          ]}
        />
      {:else if activeTab === "Networking"}
        <h2 class="text-2xl font-semibold mb-4 text-center">Networking</h2>
        <InfoTable
          data={Networking}
          columns={[
            { header: "Brand", accessor: (d) => d.brand },
            { header: "Model", accessor: (d) => d.model },
            { header: "Description", accessor: (d) => d.description },
            { header: "Price", accessor: (d) => `A$${d.price}` },
            {
              header: "Link",
              accessor: (d) => (d.url ? { href: d.url, label: "View" } : "Unknown Link"),
            },
          ]}
        />
      {:else if activeTab === "Software"}
        <h2 class="text-2xl font-semibold mb-4 text-center">Software</h2>
        <InfoTable
          data={Softwares}
          columns={[
            { header: "Software", accessor: (d) => d.name },
            { header: "Description", accessor: (d) => d.description },
            { header: "Supported OS", accessor: (d) => d.supportedOS.join(", ") },
          ]}
        />
      {:else if activeTab === "Programming Stack"}
        <h2 class="text-2xl font-semibold mb-4 text-center">Programming Stack</h2>
        <InfoTable
          data={Languages}
          columns={[
            { header: "Name", accessor: (d) => d.name },
            { header: "Description", accessor: (d) => d.description },
            { header: "Supported OS", accessor: (d) => d.supportedOS.join(", ") },
          ]}
        />
      {:else}
        <h2 class="text-2xl font-semibold mb-4 text-center">Favorite Foods</h2>
        <InfoTable
          data={FavFoods}
          columns={[
            { header: "Food Name", accessor: (d) => d.foodName },
            { header: "Country of Origin", accessor: (d) => d.countryOfOrigin },
            {
              header: "Link",
              accessor: (d) =>
                d.woolworthsLink ? { href: d.woolworthsLink, label: "Buy Here" } : "No Link",
            },
          ]}
        />
      {/if}
    </div>
  </div>

  <h2 class="mt-12 text-3xl font-semibold text-center text-primary-header">Now Playing</h2>
  <div class="mt-4 flex w-full justify-center">
    <div class="w-full max-w-280">
      {#if songsLoading}
        <NowPlayingSkeleton />
      {:else}
        <div
          class="bg-card-background text-primary-paragraph w-full overflow-hidden rounded-lg gap-1 flex flex-col p-4"
        >
          {#each songs as song, i (i)}
            <SongItem {song} />
          {/each}
        </div>
      {/if}
    </div>
  </div>
</main>
