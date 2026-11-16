<script lang="ts">
  import { externalConfirm } from "#lib/external.svelte.ts";

  function cancel() {
    externalConfirm.href = null;
  }

  function confirmAndSkip() {
    if (!externalConfirm.href) return;
    localStorage.setItem("skipExternalConfirm", "true");
    window.open(externalConfirm.href, "_blank", "noopener,noreferrer");
    externalConfirm.href = null;
  }

  function onkeydown(e: KeyboardEvent) {
    if (externalConfirm.href && e.key === "Escape") cancel();
  }
</script>

<svelte:window {onkeydown} />

{#if externalConfirm.href}
  <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 bg-highest-drop flex items-center justify-center z-50"
    onclick={cancel}
  >
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
    <div
      class="bg-highest-background rounded-lg p-6 pb-4 max-w-md w-full text-center"
      onclick={(e) => e.stopPropagation()}
    >
      <h2 class="text-2xl text-primary-header font-semibold">You're leaving this site</h2>
      <p class="text-sm text-demuted">
        This link leads to an external site ({externalConfirm.href}). Are you sure you want
        to continue?
      </p>
      <div class="flex justify-center mt-4 gap-4">
        <button
          onclick={cancel}
          class="bg-input-clickable-background hover:bg-input-clickable-background-hover text-input-clickable-text px-6 text-lg rounded-lg font-bold"
        >
          Cancel
        </button>
        <a
          href={externalConfirm.href}
          target="_blank"
          rel="noopener noreferrer"
          onclick={cancel}
          class="bg-a-button-background hover:bg-a-button-background-hover text-a-button-text py-2 px-6 font-bold duration-100 transition-colors text-center text-lg rounded-lg"
        >
          Continue
        </a>
      </div>
      <button
        onclick={confirmAndSkip}
        class="mt-2.5 text-sm text-demuted hover:underline cursor-pointer"
      >
        Do not show this again.
      </button>
    </div>
  </div>
{/if}
