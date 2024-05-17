<template>
  <div class="companies">
    <div class="companies__header">
      <div class="companies__th">Задача</div>
      <div class="companies__th">Статус</div>
      <div class="companies__th">Важность</div>
      <div class="companies__th">Ответсвенный</div>
      <div class="companies__th">Сроки</div>
      <div class="companies__th">Бюджет</div>
      <div class="companies__th">План</div>
      <div class="companies__th"></div>
    </div>
    <router-link
      v-for="task in tasks"
      :key="task.id"
      :to="`/companies/${$route.params.companyId}/${$route.params.projectId}/tasks/${task.id}`"
      class="companies__item"
    >
      <div class="companies__td">{{ task.name }}</div>
      <div class="companies__td">
        <span
          class="status"
          :style="{ backgroundColor: getStatus(task.status).color }"
        >
          {{ getStatus(task.status).name }}
        </span>
      </div>
      <div class="companies__td">{{ getPriority(task.priority).name }}</div>
      <div class="companies__td">
        {{ getResponsible(task.responsible_id).name }}
      </div>
      <div class="companies__td">
        {{ $moment(task.deadline).format("DD.MM.YYYY") }}
      </div>
      <div class="companies__td">{{ task.budget.toLocaleString() }} руб.</div>
      <div class="companies__td">{{ task.plan }} мин.</div>

      <div class="companies__btns">
        <button
          class="companies__btn"
          @click.stop.prevent="$emit('delete', task)"
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
    tasks: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["statusList", "prioritiesList", "teams"]),
  },
  methods: {
    getStatus(id) {
      return this.statusList.find((s) => s.id == id) ?? {};
    },
    getPriority(id) {
      return this.prioritiesList.find((p) => p.id == id) ?? {};
    },
    getResponsible(id) {
      const companyId = this.$route.params.companyId;
      return this.teams[companyId].find((p) => p.id == id) ?? {};
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
  color: #fff;
  background-color: var(--dark-color-2);
  border-radius: 20px;
  box-shadow: var(--shadow-dark-items);
  overflow-x: auto;

  &__header {
    display: inline-flex;
    align-items: center;
    padding: 12px 30px;
    gap: 20px;
    position: relative;
    border-bottom: 1px solid #b3b2b2;
  }
  &__th {
    font-size: 16px;
  }
  &__td {
    font-size: 18px;
  }

  &__th,
  &__td {
    width: 150px;
    min-width: 150px;

    &:nth-child(1) {
      width: 250px;
      min-width: 250px;
    }
    &:last-child {
      width: 40px;
      min-width: 40px;
    }
  }

  &__item {
    display: inline-flex;
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
.status {
  color: #454444;
  padding: 7px 17px;
  border-radius: 10px;
}
</style>
