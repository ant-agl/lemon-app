<template>
  <button class="icon-btn">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.icon-btn {
  background-color: var(--dark-color-2);
  border-radius: 100px;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  box-sizing: border-box;
  box-shadow: 0 0 25px 0 rgba(31, 31, 31, 0.26);
  transition: 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 25px 0 rgba(31, 31, 31, 0.5);
  }

  &.white {
    background-color: #fff;

    &:hover {
      background-color: var(--light-gray-color);
    }
  }
}
</style>
