<template>
  <div class="input" :class="{ error }">
    <label class="input__container">
      <img v-if="icon" :src="icon" class="input__icon" />
      <input
        :type="currentType"
        :placeholder="placeholder"
        :value="modelValue"
        @input="handleInput($event.target.value)"
        :style="{ paddingLeft, paddingRight }"
      />
      <img
        v-if="type == 'password'"
        @click="togglePassword"
        :src="
          require(`@/assets/icons/${
            currentType == 'password' ? 'close' : 'open'
          }.svg`)
        "
        class="input__icon input__icon_password"
      />
    </label>
    <p v-if="errorText" class="input__error">{{ errorText }}</p>
  </div>
</template>

<script>
export default {
  emits: ["update:modelValue"],
  props: {
    type: { type: String, default: "text" },
    placeholder: String,
    modelValue: [String, Number],
    icon: String,
    error: Boolean,
    errorText: String,
  },
  data() {
    return {
      currentType: this.type,
    };
  },

  computed: {
    paddingLeft() {
      return (this.icon ? 45 : 20) + "px";
    },
    paddingRight() {
      return (this.type == "password" ? 45 : 20) + "px";
    },
  },
  methods: {
    togglePassword() {
      if (this.currentType == "password") {
        this.currentType = "text";
      } else {
        this.currentType = "password";
      }
    },
    handleInput(value) {
      this.$emit("update:modelValue", value.trim());
    },
  },
};
</script>

<style scoped lang="scss">
.input {
  &__container {
    display: flex;
    align-items: center;
    position: relative;
    border: none;
    border-radius: 30px;
    overflow: hidden;
    background: var(--light-gray-color);
    width: 100%;
    transition: 0.2s;
    &:focus-within {
      background: #f8faca;
    }
  }
  input {
    flex: 1;
    border: none;
    outline: none;
    padding: 12px 20px;
    background: transparent;
    color: #454444;
    font-size: 16px;
    line-height: 24px;
  }
  &__icon {
    position: absolute;
    left: 14px;
    width: 24px;
    height: 24px;
    &_password {
      cursor: pointer;
      left: auto;
      right: 14px;
    }
  }

  &.error &__container {
    background-color: var(--error-bg);
  }
  &__error {
    color: var(--error-color);
    font-size: 12px;
    font-weight: 600;
    margin-left: 14px;
  }
}
</style>
