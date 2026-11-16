
import type { Software } from "#lib/types.ts";

const Softwares: Software[] = [
  {
    name: "Zen Browser",
    description: "A Firefox base browser like Arc-browser.",
    supportedOS: ["Windows", "Linux", "macOS"],
  },
  {
    name: "Discord",
    description: "A social client.",
    supportedOS: ["Windows", "Linux (x86 only)", "macOS"],
  },
  {
    name: "Alacritty",
    description: "A minimal terminal emulator made with Rust.",
    supportedOS: ["Linux", "macOS"],
  },
  {
    name: "Nix",
    description: "A package management and build-system.",
    supportedOS: ["Linux", "macOS"],
  },
  {
    name: "AeroSpace",
    description: "A manual tiler built ontop of AXAccessability for macOS.",
    supportedOS: ["macOS"],
  },
  {
    name: "MangoWC",
    description: "An extremely minimal dynamic tiler build ontop of the Wayland protocol.",
    supportedOS: ["Linux"],
  },
];

export default Softwares;
