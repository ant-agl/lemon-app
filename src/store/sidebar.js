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
      {
        icon: require("@/assets/img/icons/chart.svg"),
        label: "Отчеты",
        link: "/report",
      },
    ],
  },
  getters: {
    sidebarLinks: (state) => state.sidebarLinks,
  },
};
