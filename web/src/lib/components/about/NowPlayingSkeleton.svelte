<div class="bg-card-background text-primary-paragraph w-full overflow-hidden rounded-lg gap-1 flex flex-col p-4">
  {#each { length: 10 }, i (i)}
    <div class="flex items-center justify-between gap-4 p-1 animate-pulse">
      <div class="flex items-center gap-2">
        <div class="w-12 h-12 rounded-md bg-demuted"></div>
        <div class="flex flex-col gap-1">
          <div class="h-4 w-32 bg-muted rounded-sm"></div>
          <div class="flex gap-2">
            <div class="h-3 w-20 bg-muted rounded-sm"></div>
            <div class="h-3 w-16 bg-muted rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>
