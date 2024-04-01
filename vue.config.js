const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    iconPaths: {
      favicon32: "icon.png",
      favicon16: "icon.png",
      appleTouchIcon: "icon.png",
      maskIcon: "icon.png",
      msTileImage: "icon.png",
    },
    manifestOptions: {
      icons: [
        // {
        //   src: "/app/img/icon-app.png",
        //   sizes: "275x275",
        //   type: "image/png",
        // },
      ],
      display: "standalone",
    },
    themeColor: "#f3f2e0",
    appleMobileWebAppCapable: "yes",
  },
});
