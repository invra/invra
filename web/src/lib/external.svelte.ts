/** Shared state for the "You're leaving this site" confirmation dialog. */
export const externalConfirm = $state<{ href: string | null }>({ href: null });

export function isExternal(href: string) {
  return href.startsWith("http");
}

/** Returns true if navigation should be blocked to show the confirmation. */
export function interceptExternal(href: string): boolean {
  if (!isExternal(href)) return false;
  if (localStorage.getItem("skipExternalConfirm") === "true") return false;
  externalConfirm.href = href;
  return true;
}
