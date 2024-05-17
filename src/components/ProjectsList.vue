<template>
  <h5 class="title-table">Список проектов</h5>
  <div class="companies">
    <div class="companies__header">
      <div class="companies__th"></div>
      <div class="companies__th">Проект</div>
      <div class="companies__th">Клиент</div>
    </div>
    <router-link
      v-for="project in projects"
      :key="project.id"
      :to="`/companies/${$route.params.companyId}/${project.id}/tasks`"
      class="companies__item"
    >
      <div
        class="companies__color"
        :style="{ backgroundColor: project.color }"
      ></div>
      <div class="companies__title">{{ project.name }}</div>
      <div class="companies__position">
        {{ getClient(project.client_id).name }}
      </div>
      <div class="companies__btns">
        <router-link
          :to="`/companies/${$route.params.companyId}/${project.id}`"
          class="companies__btn"
        >
          <img src="@/assets/img/icons/edit.svg" alt="Редактировать" />
        </router-link>
        <button
          class="companies__btn"
          @click.stop.prevent="$emit('delete', project)"
        >
          <img src="@/assets/img/icons/trash.svg" alt="Trash" />
        </button>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  emits: ["delete"],
  props: {
    projects: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["clients"]),
    currentClients() {
      return this.clients[this.$route.params.companyId];
    },
  },
  methods: {
    getClient(id) {
      return this.currentClients.find((c) => c.id == id) ?? {};
    },
  },
};
</script>

<style lang="scss" scoped>
.title-table {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
}
.companies {
  background-color: var(--dark-color-2);
  border-radius: 20px;
  overflow: hidden;
  color: #fff;
  box-shadow: var(--shadow-dark-items);

  &__header {
    display: flex;
    align-items: center;
    padding: 12px 30px;
    gap: 20px;
    position: relative;
    border-bottom: 1px solid #b3b2b2;
  }
  &__th {
    font-size: 16px;
    &:nth-child(1) {
      width: 20px;
    }
    &:nth-child(2) {
      width: 200px;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 15px 30px;
    gap: 20px;
    position: relative;
    transition: 0.2s;
    color: #fff;
    cursor: pointer;

    &:hover {
      background-color: var(--dark-color-hover);
    }

    &:not(:last-child)::after {
      content: "";
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: var(--divide-list-center);
    }
  }
  &__color {
    width: 20px;
    height: 20px;
    border-radius: 20px;
  }
  &__title {
    font-size: 18px;
    width: 200px;
  }
  &__position {
    font-size: 18px;
  }
  &__btns {
    display: flex;
    align-items: center;
    gap: 3px;
    margin-left: auto;
    transition: opacity 0.2s;
    opacity: 0;
  }
  &__item:hover &__btns {
    opacity: 1;
  }
  &__btn {
    border: none;
    background-color: transparent;
    min-width: 40px;
    max-width: 40px;
    height: 40px;
    box-sizing: border-box;
    padding: 11px;
    border-radius: 100px;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background-color: var(--bg-input);
    }
  }
}
</style>
