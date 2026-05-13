{
  description = "Website + Spellchecking";
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    fenix = {
      url = "github:nix-community/fenix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };
  outputs = { nixpkgs, ... }@inputs:
  let
    forAllSystems = nixpkgs.lib.genAttrs nixpkgs.lib.systems.flakeExposed;
  in
  {
    devShells = forAllSystems (system: let
      pkgs = import nixpkgs { inherit system; };
    in {
      default = let
        inherit (inputs)fenix;
        toolchain = with fenix.packages.${pkgs.stdenv.system}; combine [
          latest.toolchain
          targets.wasm32-unknown-unknown.latest.rust-std
        ];
      in pkgs.mkShell {
        buildInputs = with pkgs; [
          typos
          wrangler
          toolchain
          worker-build
        ];
      };
    });
  };
}
