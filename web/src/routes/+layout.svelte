<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import Header from "#lib/components/Header.svelte";
  import Footer from "#lib/components/Footer.svelte";
  import TailwindIndicator from "#lib/components/TailwindIndicator.svelte";
  import ExternalConfirm from "#lib/components/ExternalConfirm.svelte";
  import { initTheme } from "#lib/theme.svelte.ts";

  let { children } = $props();

  onMount(() => {
    initTheme();

    // Warn people poking around in devtools.
    let warned = false;
    const warnOnce = () => {
      if (warned) return;
      warned = true;
      console.warn("%c STOP!", "font-size: 40px; font-weight: bold; color: red;");
      console.info(
        "%cDo NOT paste anything here unless you know exactly what you're doing.\n" +
          "You might give attackers access to certain info.",
        "font-size: 16px; color: white; border-radius: 4px;",
      );
    };
    const onChange = (e: Event) => {
      if ((e as CustomEvent<{ isOpen: boolean }>).detail.isOpen) warnOnce();
    };
    window.addEventListener("devtoolschange", onChange);
    import("devtools-detect").then(({ default: devtools }) => {
      if (devtools.isOpen) warnOnce();
    });
    return () => window.removeEventListener("devtoolschange", onChange);
  });
</script>

<svelte:head>
  <meta name="description" content="The world's worst developer out there probably." />
</svelte:head>

<Header />
<TailwindIndicator />
<div class="p-8 pt-26 min-h-[calc(100vh)]">
  {@render children()}
</div>
<Footer />
<ExternalConfirm />
