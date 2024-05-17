<template>
  <div class="dropdown" :class="{ active: isActive }">
    <h6 v-if="title" class="dropdown__title">{{ title }}</h6>
    <div class="dropdown__label" ref="menuBtn" @click="isActive = !isActive">
      <span>{{ activeLabel }}</span>
      <img src="@/assets/img/icons/arr-down.svg" />
    </div>
    <div class="dropdown__list">
      <div
        v-for="item in list"
        :key="item.id"
        class="dropdown__item"
        @mousedown="
          $emit('update:modelValue', item.id);
          isActive = false;
        "
      >
        {{ item.label }}

        <img
          v-if="item.id == modelValue"
          src="@/assets/img/icons/check-line.svg"
          class="dropdown__check"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["update:modelValue"],
  props: {
    list: Array,
    modelValue: [Number, String],
    title: String,
  },
  data: () => ({
    isActive: false,
  }),
  computed: {
    activeLabel() {
      if (this.list.length == 0 || this.modelValue === "") return "";
      return this.list.find((l) => l.id == this.modelValue).label;
    },
  },
  methods: {
    closeMenu(e) {
      if (!this.$refs.menuBtn.contains(e.target)) this.isActive = false;
    },
  },
  mounted() {
    document.body.addEventListener("click", this.closeMenu);
  },
  unmounted() {
    document.body.removeEventListener("click", this.closeMenu);
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  width: 100%;

  &__title {
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 600;
  }

  &__label {
    border-radius: 10px;
    background-color: var(--bg-input);
    width: 100%;
    padding: 12px 20px;
    color: #fff;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
    box-sizing: border-box;
    cursor: pointer;
    transition: 0.2s;

    img {
      transition: 0.2s;
      width: 18px;
    }
  }

  &__list {
    position: absolute;
    top: 105%;
    transform-origin: top center;
    transform: scaleY(0);
    opacity: 0;
    left: 0;
    right: 0;
    width: 100%;
    min-width: 150px;
    max-height: 240px;
    overflow-y: auto;
    transition: 0.2s;
    z-index: 10;
    background-color: #424242;
    box-shadow: var(--shadow-bg-dark);
    border-radius: 8px;
    font-size: 13px;
    line-height: 22px;
  }

  &__item {
    transition: 0.2s;
    padding: 10px 17px;
    cursor: pointer;
    background-color: #424242;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    &:not(:last-child)::after {
      content: "";
      position: absolute;
      display: block;
      height: 1px;
      width: 100%;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--divide-list-center);
    }

    &:hover {
      background-color: #383838;
    }
  }

  &__check {
    width: 16px;
  }

  &.active {
    .dropdown__label img {
      transform: rotate(180deg);
    }
    .dropdown__list {
      transform: scaleY(1);
      opacity: 1;
    }
  }
}
</style>
