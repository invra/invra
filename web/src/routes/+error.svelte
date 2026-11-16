<script lang="ts">
  import Link from "#lib/components/Link.svelte";
</script>

<svelte:head>
  <title>InvraNet's Website</title>
</svelte:head>

<main class="flex flex-col absolute top-0 right-0 left-0 bottom-0 justify-center items-center">
  <div class="animate-rise flex justify-center lg:justify-end md:items-center">
    <h1 class="text-6xl text-center font-bold">404</h1>
  </div>
  <div class="animate-rise [animation-delay:200ms] flex justify-center lg:justify-end md:items-center">
    <h1 class="text-3xl text-center font-bold">You must be lost!</h1>
  </div>
  <div class="animate-rise [animation-delay:400ms] flex justify-center lg:justify-end md:items-center">
    <h1 class="text-lg text-center font-bold">The place you have tried to go to does not exist.</h1>
  </div>
  <div class="animate-rise [animation-delay:600ms] flex justify-center pt-3 lg:justify-end md:items-center">
    <Link type="general" href="/">Go Home</Link>
  </div>
</main>
