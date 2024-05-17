const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin("define").tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "true",
      });
      return definitions;
    });
  },
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
