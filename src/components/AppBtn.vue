<template>
  <button type="submit" class="btn" :class="classes" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    classes: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.btn {
  background-color: var(--main-color);
  padding: 12px 30px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  height: 48px;
  font-weight: 600;
  &:hover {
    background-color: var(--main-color-hover);
  }
}
</style>
