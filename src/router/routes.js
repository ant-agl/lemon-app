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
    path: "/report",
    name: "report",
    meta: {
      title: "Отчеты",
      layout: "main",
      auth: true,
    },
    component: () => import("@/views/ReportView.vue"),
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
    path: "/companies/:companyId",
    name: "company",
    meta: {
      title: "Компания",
      layout: "main",
      auth: true,
    },
    component: () => import("@/views/CompanyView.vue"),
  },
  {
    path: "/companies/:companyId/team",
    name: "team",
    meta: {
      title: "Команда",
      layout: "main",
      auth: true,
    },
    component: () => import("@/views/TeamView.vue"),
  },
  {
    path: "/companies/:companyId/clients",
    name: "clients",
    meta: {
      title: "Клиенты",
      layout: "main",
      auth: true,
    },
    component: () => import("@/views/ClientsView.vue"),
  },
  {
    path: "/companies/:companyId/:projectId(\\d+)",
    name: "project",
    meta: {
      title: "Проект",
      layout: "main",
      auth: true,
    },
    component: () => import("@/views/ProjectView.vue"),
  },
  {
    path: "/companies/:companyId/:projectId(\\d+)/tasks",
    name: "tasks",
    meta: {
      title: "Список задач",
      layout: "main",
      auth: true,
    },
    component: () => import("@/views/TasksView.vue"),
  },
  {
    path: "/companies/:companyId/:projectId(\\d+)/tasks/:taskId",
    name: "task",
    meta: {
      title: "Задача",
      layout: "main",
      auth: true,
    },
    component: () => import("@/views/TaskView.vue"),
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
