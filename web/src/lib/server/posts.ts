import { Marked, type Tokens } from "marked";
import hljs from "highlight.js";
import { parse as parseYaml } from "yaml";
import type { PageEntry, PageMeta } from "#lib/types.ts";

// Posts live in `src/content/**/*.md`; the slug is the path without the extension.
const files = import.meta.glob("/src/content/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const PREFIX = "/src/content/";

function slugOf(path: string) {
  return path.slice(PREFIX.length).replace(/\.md$/, "");
}

/** Same ordering as the old site: shallow paths first, then alphabetical. */
const slugs = Object.keys(files)
  .map(slugOf)
  .sort((a, b) => {
    const depth = a.split("/").length - b.split("/").length;
    return depth !== 0 ? depth : a.localeCompare(b);
  });

function splitFrontmatter(source: string): { meta: PageMeta; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source);
  if (!match) return { meta: { title: "", writer: "", summary: "" }, body: source };
  const raw = parseYaml(match[1]) as Record<string, unknown>;
  // YAML parses ISO timestamps as strings here, but be defensive about Date objects.
  const meta = Object.fromEntries(
    Object.entries(raw).map(([k, v]) => [k, v instanceof Date ? v.toISOString() : v]),
  ) as PageMeta;
  return { meta, body: source.slice(match[0].length) };
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const headingId = (text: string) => text.trim().replace(/\s+/g, "-").toLowerCase();

// Lucide "copy" and "check" icons, inlined since this HTML is rendered as a string.
const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;

function highlightLine(line: string, language: string) {
  if (language && hljs.getLanguage(language)) {
    return hljs.highlight(line, { language, ignoreIllegals: true }).value;
  }
  return escapeHtml(line);
}

const marked = new Marked({
  gfm: true,
  renderer: {
    heading({ tokens, depth }: Tokens.Heading) {
      const html = this.parser.parseInline(tokens);
      const id = headingId(tokens.map((t) => ("text" in t ? t.text : t.raw)).join(""));
      const size = depth === 2 ? "text-4xl" : "text-3xl";
      return `<h${depth} id="${escapeHtml(id)}" class="${size} font-bold text-primary-header">${html}</h${depth}>\n`;
    },
    paragraph({ tokens }: Tokens.Paragraph) {
      return `<p class="mt-1">${this.parser.parseInline(tokens)}</p>\n`;
    },
    link({ href, title, tokens }: Tokens.Link) {
      const external = href.startsWith("http");
      const attrs = external ? ` target="_blank" rel="noopener noreferrer"` : "";
      const t = title ? ` title="${escapeHtml(title)}"` : "";
      return `<a href="${escapeHtml(href)}"${t}${attrs} class="text-primary-link duration-100 transition-colors text-center rounded-lg">${this.parser.parseInline(tokens)}</a>`;
    },
    hr() {
      return `<hr class="border-0 py-4" />\n`;
    },
    blockquote({ tokens }: Tokens.Blockquote) {
      return `<blockquote class="bg-noteblock-base mt-6 rounded-lg overflow-hidden relative"><div class="bg-noteblock-higher h-full w-3 absolute top-0 left-0"></div><div class="p-6 pt-2">${this.parser.parse(tokens)}</div></blockquote>\n`;
    },
    list(token: Tokens.List) {
      const tag = token.ordered ? "ol" : "ul";
      const start = token.ordered && token.start !== 1 ? ` start="${token.start}"` : "";
      const items = token.items.map((item) => this.listitem(item)).join("");
      // The old site styled every list as decimal.
      return `<${tag}${start} class="list-decimal">${items}</${tag}>\n`;
    },
    listitem(item: Tokens.ListItem) {
      return `<li class="ml-6">${this.parser.parse(item.tokens)}</li>\n`;
    },
    codespan({ text }: Tokens.Codespan) {
      // `text` is already HTML-escaped by marked.
      return `<code class="inline-code text-demuted bg-codeblock-base rounded-md px-2 my-1 inline-flex gap-2 select-none">${text}</code>`;
    },
    code({ text, lang }: Tokens.Code) {
      // Info string is `lang:name` or `diff:lang:name`.
      const parts = (lang ?? "").split(":");
      const isDiff = parts[0] === "diff";
      const language = (isDiff ? parts[1] : parts[0]) ?? "";
      const name = (isDiff ? parts.slice(2) : parts.slice(1)).join(":") || "Untitled";

      const lines = text
        .split("\n")
        .map((line) => {
          const tone = line.startsWith("+")
            ? " bg-header-diiae-background text-header-diiae-foreground"
            : line.startsWith("-")
              ? " bg-a-button-background text-a-button-text"
              : "";
          return `<div class="px-4 whitespace-pre${tone}"><code class="hljs language-${escapeHtml(language)}">${highlightLine(line, language)}</code></div>`;
        })
        .join("");

      return `<div class="code-block relative mt-2 bg-codeblock-base rounded-lg overflow-hidden" data-code="${escapeHtml(text)}">
<div class="px-2 top-0 left-0 right-0 w-full h-10 flex justify-between items-center bg-codeblock-higher">
<div class="font-bold ml-2 select-none">${escapeHtml(name)}</div>
<button type="button" class="copy-button flex text-sm items-center gap-2 cursor-pointer hover:bg-input-interactive-hover/60 p-1.5 rounded-lg transition-colors"><span class="copy-idle flex items-center gap-2">Copy${copyIcon}</span><span class="copy-done hidden items-center gap-2">Copied!${checkIcon}</span></button>
</div>
<pre class="py-4 overflow-x-scroll text-sm font-mono leading-relaxed">${lines}</pre>
</div>\n`;
    },
  },
});

export function getAllSlugs(): string[] {
  return slugs;
}

export function getAllPosts(): PageEntry[] {
  return slugs.map((slug) => ({
    slug,
    meta: splitFrontmatter(files[`${PREFIX}${slug}.md`]).meta,
  }));
}

export function getPost(slug: string): { meta: PageMeta; html: string } | null {
  const source = files[`${PREFIX}${slug}.md`];
  if (source === undefined) return null;
  const { meta, body } = splitFrontmatter(source);
  return { meta, html: marked.parse(body, { async: false }) };
}
