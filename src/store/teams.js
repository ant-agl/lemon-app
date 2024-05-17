export default {
  state: {
    teams: {
      42: [
        {
          id: 115,
          name: "Антон",
          role: "Владелец",
          email: "ant-agl@ya.ru",
          salary: 1000,
          salaryType: "hour",
          desc: "",
        },
      ],
      48: [
        {
          id: 115,
          name: "Антон",
          role: "Владелец",
          email: "ant-agl@ya.ru",
          salary: 300,
          salaryType: "hour",
          desc: "",
        },
        {
          id: 2,
          name: "Саша",
          role: "Бэк",
          email: "alex@ya.ru",
          salary: 300,
          salaryType: "hour",
          desc: "Соучередитель",
        },
        {
          id: 3,
          name: "Эльдар",
          role: "Фронт",
          email: "eldar@ya.ru",
          salary: 30000,
          salaryType: "fix",
          desc: "",
        },
      ],
      55: [
        {
          id: 115,
          name: "Антон",
          role: "Владелец",
          email: "ant-agl@ya.ru",
          salary: 300,
          salaryType: "hour",
          desc: "",
        },
        {
          id: 2,
          name: "Саша",
          role: "Бэк",
          email: "alex@ya.ru",
          salary: 300,
          salaryType: "hour",
          desc: "Соучередитель",
        },
      ],
    },
  },
  getters: {
    teams: (s) => s.teams,
  },
};
