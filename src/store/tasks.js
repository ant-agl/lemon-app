export default {
  state: {
    tasks: [
      {
        id: 1,
        project_id: 1,
        company_id: 48,
        name: "Сделать дизайн страницы отчетов",
        status: 1,
        priority: 0,
        deadline: "2024-06-05",
        plan: 600, // в минутах
        fact: "", // в минутах
        budget: 0,
        responsible_id: 3,
        desc: "",
        files: [],
      },
      {
        id: 2,
        project_id: 1,
        company_id: 48,
        name: "Сверстать страницу отчетов",
        status: 0,
        priority: 1,
        deadline: "2024-05-12",
        plan: 900,
        fact: "",
        budget: 0,
        responsible_id: 115,
        desc: "",
        files: [],
      },
      {
        id: 3,
        project_id: 3,
        company_id: 55,
        name: "Поменять дизайн кнопки",
        status: 3,
        priority: 2,
        deadline: "2024-04-27",
        plan: 30,
        fact: 30,
        budget: 500,
        responsible_id: 2,
        desc: "",
        files: [],
      },
    ],
    statusList: [
      { id: 0, name: "Новое", color: "#D0D0D0" },
      { id: 1, name: "В работе", color: "#F8FCAF" },
      { id: 2, name: "Тестирование", color: "#B7FBFF" },
      { id: 3, name: "Готово", color: "#D5FFCE" },
      { id: 4, name: "Отмена", color: "#FFDADA" },
    ],
    prioritiesList: [
      { id: 0, name: "Важная", color: "#FFF0E5" },
      { id: 1, name: "Обычная", color: "#FFFEDC" },
      { id: 2, name: "Не важная", color: "#ECECEC" },
    ],
  },
  getters: {
    tasks: (s) => s.tasks,
    statusList: (s) => s.statusList,
    prioritiesList: (s) => s.prioritiesList,
  },
};
