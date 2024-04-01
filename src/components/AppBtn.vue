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
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  height: 48px;
  font-weight: 600;
  transition: box-shadow 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

  :deep(img) {
    min-width: 18px;
    max-width: 18px;
  }

  &:hover {
    // background-color: var(--main-color-hover);
    box-shadow: 0px 0px 0px 9999px rgba(0, 0, 0, 0.2) inset;
  }

  &.full-w {
    width: 100%;
  }
  &.cancel {
    background-color: #d0d0d0;
  }
  &.dangerBgDark {
    background-color: var(--bg-danger-dark);
  }
  &.shadow {
    box-shadow: var(--shadow-btn);
  }
}
</style>
