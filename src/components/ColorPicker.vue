<template>
  <div class="color-picker" ref="picker">
    <div
      class="color-picker__selected"
      :style="{ backgroundColor: modelValue }"
    ></div>
    <IconBtn @click.prevent="active = !active">
      <img src="@/assets/img/icons/palette.svg" alt="Цвет" />
    </IconBtn>

    <div class="color-picker__list" :class="{ active }">
      <div
        v-for="color in colorsList"
        :key="color"
        class="color-picker__color"
        :style="{ backgroundColor: color }"
        @click.prevent="
          $emit('update:modelValue', color);
          active = false;
        "
      ></div>
    </div>
  </div>
</template>

<script>
import IconBtn from "@/components/IconBtn";

import { mapGetters } from "vuex";

export default {
  emit: ["update:modelValue"],
  components: { IconBtn },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    active: false,
  }),
  computed: {
    ...mapGetters(["colorsList"]),
  },
  methods: {
    close(e) {
      if (!this.$refs.picker.contains(e.target)) this.active = false;
    },
  },
  mounted() {
    document.body.addEventListener("click", this.close);
  },
  unmounted() {
    document.body.removeEventListener("click", this.close);
  },
};
</script>

<style lang="scss" scoped>
.color-picker {
  position: relative;
  z-index: 1;
  width: 50px;
  height: 50px;

  &__selected {
    width: 16px;
    height: 16px;
    border-radius: 20px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    transition: 0.2s;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.57);
  }

  &__list {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 52px 0 16px;
    position: absolute;
    z-index: -1;
    top: 25px;
    width: 100%;
    border-radius: 100px;
    gap: 18px;
    background-color: var(--dark-color-2);
    transition: 0.2s;
    transform-origin: top;
    transform: scaleY(0);
    box-shadow: var(--shadow-bg-dark);

    &.active {
      transform: scale(1) translate(0);
      top: 0;
    }
  }

  &__color {
    width: 20px;
    height: 20px;
    border-radius: 20px;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
