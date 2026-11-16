import type { Theme } from "#lib/types.ts";

export const themes: Theme[] = ["light", "dark", "rose-pine"];

// Tailwind needs literal class names to generate them.
export const themePreview: Record<Theme, string> = {
  light: "bg-preview-light",
  dark: "bg-preview-dark",
  "rose-pine": "bg-preview-rose-pine",
};

export const theme = $state<{ current: Theme }>({ current: "dark" });

/** Pick up the theme that app.html applied before hydration. */
export function initTheme() {
  const t = document.documentElement.getAttribute("data-theme") as Theme | null;
  if (t && themes.includes(t)) theme.current = t;
}

export function setTheme(t: Theme) {
  theme.current = t;
  localStorage.setItem("theme", t);
  document.documentElement.setAttribute("data-theme", t);
}
