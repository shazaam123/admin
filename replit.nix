{ pkgs }: {
	deps = [
   pkgs.vue
   pkgs.docker
   pkgs.mysql80
   pkgs.mysql-shell
		pkgs.nodejs-18_x
    pkgs.nodePackages.typescript-language-server
    pkgs.yarn
    pkgs.replitPackages.jest
	];
}