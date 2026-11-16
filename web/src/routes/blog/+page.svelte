<script lang="ts">
  import PostCard from "#lib/components/PostCard.svelte";

  let { data } = $props();
</script>

<svelte:head>
  <title>InvraNet's Website</title>
</svelte:head>

<div>
  <h1 class="text-4xl mb-4 font-bold text-center text-primary-header">Recent Posts</h1>
  <div class="h-full gap-3 flex flex-wrap mt-6 justify-center">
    {#each data.posts as page (page.slug)}
      <PostCard {page} />
    {/each}
  </div>
</div>
