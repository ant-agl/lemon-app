<template>
  <div class="companies">
    <div class="companies__header">
      <div class="companies__th">Имя</div>
      <div class="companies__th">Прибыль с клиента</div>
    </div>
    <div
      v-for="client in clients"
      :key="client.id"
      class="companies__item"
      @click.prevent="$emit('edit', client)"
    >
      <div class="companies__title">{{ client.name }}</div>
      <div class="companies__position">
        {{ client.profit.toLocaleString() }} руб.
      </div>
      <div class="companies__btns">
        <!-- <router-link
          :to="`/companies/${company.company_id}/team`"
          class="companies__btn"
        >
          <img src="@/assets/img/icons/users.svg" alt="Team" />
        </router-link> -->
        <button class="companies__btn" @click.stop="$emit('delete', client)">
          <img src="@/assets/img/icons/trash.svg" alt="Trash" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["delete", "edit"],
  props: {
    clients: {
      type: Array,
      required: true,
    },
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
      width: 300px;
    }
  }

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
    font-size: 18px;
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
