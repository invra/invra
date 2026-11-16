<script lang="ts">
  import Link from "#lib/components/Link.svelte";

  const currentYear = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Pacific/Kiritimati", // No I don't live on Chistmas Island thank you very much.
    year: "numeric",
  }).format(new Date());
</script>

<footer
  class="flex w-full z-8 justify-center bg-primary border-t px-16 py-4 border-t-decorator-border-header/5"
>
  <div class="w-full max-w-[70rem]">
    <h2 class="text-3xl text-center font-bold">Invra</h2>
    <p class="text-center my-1">
      &copy; Invra {currentYear}
      <Link href="mailto:pacstrap@mx.idalon.org">{"<pacstrap@mx.idalon.org>"}</Link>
    </p>
    <div class="flex flex-wrap gap-4 justify-center">
      <Link href="https://gitlab.com/invranet/website">GitLab</Link>
      <Link href="https://gitlab.com/InvraNet/website/-/blob/master/LICENSE">
        Licensed under GPLv3-or-later
      </Link>
      <Link href="https://v2.invra.net/">Old website</Link>
    </div>
  </div>
</footer>
