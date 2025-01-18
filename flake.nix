{
  description = "Astro project with Nix Flakes";

  inputs = {
    # Use Nixpkgs for dependencies
    nixpkgs.url = "github:nixos/nixpkgs/nixos-22.11";

    # NodeJS flake to manage NodeJS
    nodejs.url = "github:nix-community/nixpkgs-nodejs";
    
    # Optionally, you can add other inputs like a build tool (e.g., GitHub actions) if necessary
  };

  outputs = { self, nixpkgs, nodejs, ... }:

  let
    # Create the shell environment
    system = "x86_64-linux"; # or your system architecture
    pkgs = import nixpkgs { inherit system; };

    nodeEnv = nodejs.createNodeEnv {
      nodePackages = [
        pkgs.nodePackages.astro
        pkgs.nodePackages.npm
      ];
    };

  in {
    # The default is to build the project in a development shell
    devShell = pkgs.mkShell {
      buildInputs = [
        nodeEnv
      ];

      shellHook = ''
        echo "Welcome to your Astro project shell"
      '';
    };

    # Optionally, if you want to build the site
    # If you want to use `nix build` to build the project
    defaultPackage = pkgs.stdenv.mkDerivation {
      name = "astro-site";
      src = ./.;
      buildInputs = [ nodeEnv ];

      buildPhase = ''
        # Install dependencies
        npm install

        # Build the site
        npm run build
      '';
    };
  }
}
