<template>
  <div class="data">
    <div v-for="item in data" :key="item.value" class="data__item">
      {{ item.value }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.data {
  background-color: var(--dark-color-2);
  border-radius: 25px;
  max-width: 450px;
  box-shadow: var(--shadow-dark-items);

  &__item {
    padding: 19px 34px;
    color: #fff;
    font-size: 20px;
    font-weight: 400;
    position: relative;

    &:not(:last-child)::after {
      content: "";
      position: absolute;
      display: block;
      width: 100%;
      height: 1px;
      bottom: 0;
      left: 0;
      background: var(--divide-list-center);
    }
  }
}
</style>
