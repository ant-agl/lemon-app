export default {
  state: {
    projects: {
      42: [],
      48: [
        {
          id: 1,
          name: "Лимон",
          client_id: 1,
          desc: "",
          files: [],
          color: "#F5F856",
        },
      ],
      55: [
        {
          id: 2,
          name: "Виджет генерация документов",
          client_id: 2,
          desc: "Текст описания...",
          files: [],
          color: "#88DD73",
        },
        {
          id: 3,
          name: "Виджет следующая задача",
          client_id: 3,
          desc: "Виджет позволяет то-то",
          files: [],
          color: "#81D6FB",
        },
      ],
    },
    colorsList: [
      "#FB8181",
      "#FBB481",
      "#F5F856",
      "#88DD73",
      "#81D6FB",
      "#A881FB",
      "#FB81E8",
    ],
  },
  getters: {
    projects: (s) => s.projects,
    colorsList: (s) => s.colorsList,
  },
};
