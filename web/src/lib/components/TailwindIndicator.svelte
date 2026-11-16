<script lang="ts">
  import { dev } from "$app/env";
</script>

{#if dev}
  <div
    class="select-none fixed top-24 right-0 flex items-center justify-center w-6 h-6 p-3 m-8 font-mono text-xs text-white bg-gray-700 rounded-full sm:bg-pink-500 md:bg-orange-500 lg:bg-green-500 xl:bg-blue-500 2xl:bg-purple-500"
  >
    <div class="block sm:hidden md:hidden lg:hidden xl:hidden">al</div>
    <div class="hidden sm:block md:hidden lg:hidden xl:hidden">sm</div>
    <div class="hidden sm:hidden md:block lg:hidden xl:hidden">md</div>
    <div class="hidden sm:hidden md:hidden lg:block xl:hidden">lg</div>
    <div class="hidden sm:hidden md:hidden lg:hidden xl:block 2xl:hidden">xl</div>
    <div class="hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:block">2xl</div>
  </div>
{/if}
