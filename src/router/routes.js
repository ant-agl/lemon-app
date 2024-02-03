export const routes = [
  {
    path: "/login/",
    name: "login",
    meta: {
      title: "Вход",
      layout: "auth",
      noauth: true,
    },
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/",
    name: "home",
    meta: {
      title: "Home",
      layout: "main",
      auth: true,
    },
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/404",
    name: "notFound",
    meta: {
      title: "Страница не найдена",
      layout: "auth",
    },
    component: () => import("@/views/NotFoundView.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/404",
  },
];
