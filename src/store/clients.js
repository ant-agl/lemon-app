export default {
  state: {
    clients: {
      42: [],
      48: [
        {
          id: 1,
          name: "Дмитрий Гусев",
          profit: 10000,
          desc: "Владелец it компании",
        },
      ],
      55: [
        {
          id: 2,
          name: "Иван",
          profit: 5000,
          desc: "+7232130821",
        },
        {
          id: 3,
          name: "Роман",
          profit: 92800,
          desc: "",
        },
      ],
    },
  },
  getters: {
    clients: (s) => s.clients,
  },
};
