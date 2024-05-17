<template>
  <div class="breadcrumbs">
    <div v-for="item in list" :key="item.label" class="breadcrumbs__item">
      <router-link :to="item.link" class="link">
        {{ item.label }}
      </router-link>
    </div>

    <div v-if="this.$slots.default" class="breadcrumbs__item">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
  },
};
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 12px;

  &__item {
    font-size: 15px;
    color: #4f4f4f;
    display: flex;
    align-items: center;
    gap: 12px;

    .link {
      color: #4f4f4f;
      &::after {
        background-color: #4f4f4f;
      }
    }

    &:not(:first-child)::before {
      content: "";
      display: block;
      min-width: 6px;
      width: 6px;
      height: 6px;
      border-radius: 6px;
      background-color: #4f4f4f;
    }
  }
}
</style>
