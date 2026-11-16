<script lang="ts">
  import { onMount } from "svelte";
  import { DOB } from "$app/env/public";
  import Link from "#lib/components/Link.svelte";
  import { dayjs } from "#lib/time.ts";
  import invra from "#lib/assets/invra.jpg";

  const birthDate = dayjs(DOB, "DD-MM-YYYY");
  const plural = (n: number, unit: string) => `${n} ${unit}${n !== 1 ? "s" : ""}`;

  let now = $state(dayjs());
  let showCountdown = $state(false);

  const age = $derived(now.diff(birthDate, "year"));
  const countdown = $derived.by(() => {
    let next = birthDate.year(now.year());
    if (now.isAfter(next)) next = next.add(1, "year");
    const d = dayjs.duration(next.diff(now));
    return `${plural(d.months(), "month")}, ${plural(d.days(), "day")}, ${plural(d.hours(), "hour")}, ${plural(d.minutes(), "minute")}, ${plural(d.seconds(), "second")} until becoming a ${age + 1} year`;
  });

  onMount(() => {
    now = dayjs();
  });

  $effect(() => {
    if (!showCountdown) return;
    const interval = setInterval(() => (now = dayjs()), 1000);
    return () => clearInterval(interval);
  });
</script>

<svelte:head>
  <title>InvraNet's Website</title>
</svelte:head>

<main
  class="flex flex-col items-center justify-center w-full px-6 min-h-[calc(100vh-calc(var(--spacing)*40))]"
>
  <div class="grid grid-cols-1 lg:grid-cols-2 w-full max-w-5xl gap-16">
    <div class="flex justify-center lg:justify-end md:items-center">
      <div class="animate-spin-in rounded-xl overflow-hidden w-full flex h-fit max-w-xs">
        <img
          alt="grr"
          draggable="false"
          height="200"
          width="200"
          src={invra}
          fetchpriority="high"
          class="hover:scale-105 h-full object-cover transition-all duration-300 w-full"
        />
      </div>
    </div>

    <div class="animate-fade-up [animation-delay:250ms] flex flex-col items-center lg:items-start">
      <h1
        class="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-diiae-foreground text-center lg:text-left"
      >
        Invra Full-Stack Web & Native Application Developer
      </h1>
      <p class="text-base sm:text-lg mt-2 text-primary-paragraph text-center lg:text-left">
        A
        <button
          onclick={() => (showCountdown = !showCountdown)}
          class="cursor-pointer text-link-diiae-foreground font-bold hover:underline"
        >
          {showCountdown ? countdown + " old" : age + " year old"}
        </button>
        Australian developer, living in Parramatta, Sydney, who has experience in various
        programming domains, including the <strong>Web</strong> space with React, Next.js,
        Remix, <strong>Native</strong> space with Zig, C, and the <strong>Backend</strong>
        space with Express.js. Learn more about me on the <Link href="/about">About</Link> page.
        You may also want to check out <Link href="/projects">Projects</Link> for more
        information about past & current projects. Also check out my blog type thing at
        <Link href="/blog">Pages</Link>.
      </p>
      <div class="mt-8 flex flex-wrap gap-4 justify-center">
        <Link href="https://gitlab.com/invranet" type="gitlab">GitLab</Link>
        <Link href="https://youtube.com/@invranet" type="youtube">YouTube</Link>
        <Link href="https://www.last.fm/user/invranet" type="lastfm">Last.fm</Link>
      </div>
    </div>
  </div>
</main>
