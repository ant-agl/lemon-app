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
    path: "/register/",
    name: "registration",
    meta: {
      title: "Регистрация",
      layout: "auth",
      noauth: true,
    },
    component: () => import("@/views/RegisterView.vue"),
  },
  {
    path: "/forgot/",
    name: "forgot",
    meta: {
      title: "Восстановление пароля",
      layout: "auth",
      noauth: true,
    },
    component: () => import("@/views/ForgotView.vue"),
  },
  {
    path: "/verify/",
    name: "verify",
    meta: {
      title: "Верификация пароля",
      layout: "auth",
      noauth: true,
    },
    component: () => import("@/views/VerifyView.vue"),
  },
  {
    path: "/",
    name: "timer",
    meta: {
      title: "Таймер",
      layout: "main",
      auth: true,
    },
    component: () => import("@/views/TimerView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: {
      title: "Профиль",
      layout: "main",
      auth: true,
    },
    component: () => import("@/views/ProfileView.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    meta: {
      title: "Настройки",
      layout: "main",
      auth: true,
    },
    component: () => import("@/views/SettingsView.vue"),
  },
  {
    path: "/companies",
    name: "companies",
    meta: {
      title: "Мои компании",
      layout: "main",
      auth: true,
    },
    component: () => import("@/views/CompaniesView.vue"),
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
