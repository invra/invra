<script lang="ts">
  import Link from "#lib/components/Link.svelte";
  import type { Song } from "#lib/types.ts";

  let { song }: { song: Song } = $props();

  const artistUrl = $derived(`https://www.last.fm/music/${song.url.split("/")[4]}`);
  const albumUrl = $derived(`${artistUrl}/${song.album.replaceAll(" ", "+")}`);
</script>

<div
  class="flex items-center p-1 overflow-hidden rounded-lg justify-between {song.nowPlaying
    ? 'bg-track-nowplaying-background'
    : ''}"
>
  <div class="flex items-center">
    <Link href={albumUrl} type="player-art">
      <img
        draggable="false"
        width="50"
        height="50"
        src={song.image}
        alt={song.title}
        loading="lazy"
        class="w-12 h-12 object-cover transition-scale duration-300 hover:scale-110"
      />
    </Link>
    <div class="ml-2">
      <Link href={song.url} type="player-title">{song.title}</Link>
      <div class="flex gap-2 items-center">
        <Link href={artistUrl} type="player-alts">{song.artist}</Link>
        <Link href={albumUrl} type="player-alts">{song.album}</Link>
        {#if song.nowPlaying}
          <span class="text-xs text-green-500 font-bold select-none">Now Playing</span>
        {/if}
      </div>
    </div>
  </div>
</div>
