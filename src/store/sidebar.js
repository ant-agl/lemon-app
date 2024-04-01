export default {
  state: {
    sidebarLinks: [
      {
        icon: require("@/assets/img/icons/clock.svg"),
        label: "Таймер",
        link: "/",
      },
      {
        icon: require("@/assets/img/icons/folder.svg"),
        label: "Компании",
        link: "/companies",
      },
    ],
  },
  getters: {
    sidebarLinks: (state) => state.sidebarLinks,
  },
};
