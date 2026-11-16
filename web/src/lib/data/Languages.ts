
import type { Language } from "#lib/types.ts";

const Languages: Language[] = [
  {
    name: "Nix",
    description: "DSL for a build system.",
    supportedOS: ["Linux", "macOS"],
  },
  {
    name: "Rust",
    description: "Lower language language with multpile paradigms.",
    supportedOS: ["Linux", "Windows", "macOS"],
  },
  {
    name: "C++",
    description: "Object-oriented version of the C programming language.",
    supportedOS: ["Linux", "macOS", "Windows"],
  },
  {
    name: "C",
    description: "A old but amazing low-level language.",
    supportedOS: ["Linux", "macOS", "Windows"],
  },
  {
    name: "Zig",
    description:
      "A low-level programming language designed performance.",
    supportedOS: ["Windows", "Linux", "macOS"],
  },
  {
    name: "C#",
    description: "A Java reimplementation built off the .NET framework.",
    supportedOS: ["Linux", "Windows", "macOS"],
  },
  {
    name: "TypeScript",
    description: "A superset of JavaScript with type definitions.",
    supportedOS: ["Windows", "Linux", "macOS"],
  },
];

export default Languages;
