<script lang="ts" generics="T">
  import Link from "#lib/components/Link.svelte";
  import type { Column } from "#lib/types.ts";

  let { columns, data }: { columns: Column<T>[]; data: T[] } = $props();
</script>

<div class="block rounded-lg overflow-x-auto">
  <table class="w-full">
    <thead>
      <tr class="border-b border-b-decorator-border-header/5">
        {#each columns as col, i (i)}
          <th class="px-4 pb-1 text-center">{col.header}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each data as item, idx (idx)}
        <tr class="text-center {idx % 2 === 0 ? 'bg-table-content-odd' : 'bg-table-content-even'}">
          {#each columns as col, ci (ci)}
            {@const cell = col.accessor(item)}
            <td class="px-4 py-3">
              {#if typeof cell === "string"}
                {cell}
              {:else}
                <Link href={cell.href}>{cell.label}</Link>
              {/if}
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
