<template>
  <div class="companies">
    <div
      v-for="employee in team"
      :key="employee.id"
      class="companies__item"
      @click.prevent="$emit('edit', employee)"
    >
      <div class="companies__title">{{ employee.name }}</div>
      <div class="companies__position">{{ employee.role }}</div>
      <div class="companies__btns">
        <!-- <router-link
          :to="`/companies/${company.company_id}/team`"
          class="companies__btn"
        >
          <img src="@/assets/img/icons/users.svg" alt="Team" />
        </router-link> -->
        <button
          v-if="employee.id != userData.id"
          class="companies__btn"
          @click.stop="$emit('delete', employee)"
        >
          <img src="@/assets/img/icons/trash.svg" alt="Trash" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  emits: ["delete", "edit"],
  props: {
    team: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["userData"]),
  },
};
</script>

<style lang="scss" scoped>
.companies {
  background-color: var(--dark-color-2);
  border-radius: 20px;
  overflow: hidden;
  color: #fff;
  box-shadow: var(--shadow-dark-items);

  &__item {
    display: flex;
    align-items: center;
    padding: 15px 30px;
    gap: 20px;
    position: relative;
    transition: 0.2s;
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
  &__title {
    font-size: 22px;
    font-weight: 500;
    width: 300px;
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
