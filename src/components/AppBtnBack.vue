<template>
  <div class="back-btn">
    <router-link :to="backLink" class="link">
      <img src="@/assets/icons/back.svg" alt="" />Вернуться
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      default: null,
    },
  },
  computed: {
    backLink() {
      return this.link || this.getPreviousRoute();
    },
  },
  methods: {
    getPreviousRoute() {
      // Используем $route для получения предыдущего маршрута
      const previousRoute = this.$route.meta.previousRoute;

      // Если предыдущего маршрута нет, возвращаем главную страницу
      return previousRoute ? previousRoute.fullPath : "/";
    },
  },
  beforeRouteUpdate(to, from, next) {
    // Сохраняем предыдущий маршрут в мета-данных текущего маршрута
    this.$route.meta.previousRoute = from;

    next();
  },
};
</script>
