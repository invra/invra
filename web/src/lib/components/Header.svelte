<script lang="ts">
  import { page } from "$app/state";
  import { Menu, X, Palette } from "@lucide/svelte";
  import { theme, themes, themePreview, setTheme } from "#lib/theme.svelte.ts";

  const pages = [
    { name: "Home", href: "/", exact: true },
    { name: "Projects", href: "/projects", exact: true },
    { name: "About", href: "/about", exact: true },
    { name: "Blog", href: "/blog", exact: false },
  ];

  let menuVisible = $state(false);
  let themeDropdownOpen = $state(false);
  let scrollY = $state(0);
  const isFloating = $derived(scrollY > 10);

  const isActive = (p: (typeof pages)[number]) =>
    p.exact ? page.url.pathname === p.href : page.url.pathname.startsWith(p.href);

  function onkeydown(e: KeyboardEvent) {
    if (themeDropdownOpen && e.key === "Escape") themeDropdownOpen = false;
  }
</script>

<svelte:window bind:scrollY {onkeydown} />

<div
  class="fixed z-10 flex justify-center w-full transition-all duration-250 border-b-decorator-border-header/5"
>
  <div
    class="flex select-none justify-center items-center border-b-decorator-border-header/5 top-0 left-0 right-0 z-20 py-3 md:py-4 px-8 w-full filter backdrop-blur-md transition-all duration-400 {isFloating
      ? 'max-w-[70rem] shadow-lg mx-8 rounded-lg mt-4 bg-primary/80'
      : 'max-w-full bg-primary/10 border-b'}"
  >
    <div class="flex w-full max-w-[70rem] items-center justify-between space-x-2.5">
      <div class="text-2xl font-bold text-primary-paragraph">Invra</div>

      <div class="hidden md:flex items-center gap-4">
        <div class="flex gap-2 items-center text-primary-paragraph">
          {#each pages as p (p.href)}
            <a
              href={p.href}
              class="py-1 px-4 rounded-lg {isActive(p)
                ? 'text-header-diiae-foreground bg-header-diiae-background font-bold'
                : 'cursor-pointer hover:bg-header-input-background-hover'}"
            >
              {p.name}
            </a>
          {/each}
          <div class="relative justify-center items-center flex">
            <button
              onclick={() => (themeDropdownOpen = !themeDropdownOpen)}
              class="ml-2 py-1 px-4 rounded-lg cursor-pointer {themeDropdownOpen
                ? 'bg-header-diiae-background text-header-diiae-foreground'
                : 'hover:bg-header-input-background-hover text-header-input-foreground'}"
              aria-label="Theme Dropdown"
              id="theme-selector"
              onblur={() => setTimeout(() => (themeDropdownOpen = false), 100)}
            >
              <Palette />
            </button>
            {#if themeDropdownOpen}
              <div class="pointer-events-none fixed top-0 left-0 right-0 bottom-0 w-screen h-screen z-10"></div>
              <div
                class="absolute top-8 right-0 mt-2 z-20 overflow-hidden w-40 rounded-lg shadow-lg bg-card-background"
              >
                {#each themes as t (t)}
                  <button
                    onclick={() => setTheme(t)}
                    class="flex items-center w-full h-14 px-4 py-2 hover:bg-input-interactive-hover text-demuted {t ===
                    theme.current
                      ? 'bg-card-secondary'
                      : ''}"
                    id="theme-{t}"
                  >
                    <div
                      class="border border-decorator-border-header/25 rounded-full w-10 h-10 {themePreview[t]}"
                    ></div>
                    <span class="ml-3">{t}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>
        </div>
      </div>

      <button
        class="md:hidden flex items-center p-2 rounded-lg hover:bg-input-interactive-hover-negative transition"
        onclick={() => (menuVisible = true)}
        aria-label="Menu"
      >
        <Menu class="w-6 h-6" />
      </button>
    </div>
  </div>

  {#if menuVisible}
    <div class="fixed inset-0 z-50 bg-primary flex justify-center items-center">
      <div class="p-6 rounded-lg w-80 max-w-sm">
        <button
          class="absolute top-4 right-4 p-2 rounded-lg hover:bg-input-interactive-hover-negative transition"
          onclick={() => (menuVisible = false)}
          aria-label="Close menu"
        >
          <X class="w-6 h-6" />
        </button>
        <nav class="flex flex-col gap-4 mt-8">
          {#each pages as p (p.href)}
            <a
              href={p.href}
              onclick={() => (menuVisible = false)}
              class="py-2 px-4 rounded-lg text-center text-primary-paragraph text-xl hover:bg-zinc-100/5"
            >
              {p.name}
            </a>
          {/each}
          <div class="py-10"></div>
          <div class="relative justify-center items-center flex">
            <button
              onclick={() => (themeDropdownOpen = !themeDropdownOpen)}
              class="ml-2 py-1 px-4 rounded-lg hover:bg-zinc-100/5 {themeDropdownOpen
                ? 'bg-header-diiae-background text-header-diiae-foreground'
                : ''}"
              aria-label="Theme Dropdown"
            >
              <Palette />
            </button>
            {#if themeDropdownOpen}
              <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
              <div
                class="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen z-10"
                onclick={() => (themeDropdownOpen = false)}
              ></div>
              <div class="absolute z-20 overflow-hidden w-40 rounded-lg shadow-lg bg-card-background">
                {#each themes as t (t)}
                  <button
                    onclick={() => {
                      setTheme(t);
                      themeDropdownOpen = false;
                    }}
                    class="flex items-center w-full h-14 px-4 py-2 hover:bg-input-interactive-hover text-demuted {t ===
                    theme.current
                      ? 'bg-card-secondary'
                      : ''}"
                  >
                    <div
                      class="border border-decorator-border-header/25 rounded-full w-10 h-10 {themePreview[t]}"
                    ></div>
                    <span class="ml-3">{t}</span>
                  </button>
                {/each}
              </div>
            {/if}
          </div>
        </nav>
      </div>
    </div>
  {/if}
</div>
