<template>
  <div class="input" :class="{ error }">
    <label class="input__container">
      <textarea
        :placeholder="placeholder"
        :value="modelValue"
        @input="handleInput($event.target.value)"
      ></textarea>
    </label>
    <p v-if="error && errorText" class="input__error">{{ errorText }}</p>
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
  &.dark-bg {
    textarea {
      color: #fff;
    }
    .input__error {
      color: var(--color-danger-dark);
    }
  }

  &__container {
    display: flex;
    align-items: center;
    position: relative;
    border: none;
    border-radius: 10px;
    overflow: hidden;
    background: var(--bg-input);
    width: 100%;
    transition: 0.2s;
    &:focus {
      background: #f8faca;
    }
  }
  textarea {
    flex: 1;
    border: none;
    outline: none;
    padding: 12px 20px;
    background: transparent;
    color: #454444;
    font-size: 16px;
    line-height: 24px;
    min-height: 100px;
    max-height: 200px;
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
    font-size: 13px;
    font-weight: 600;
    margin-left: 14px;
    margin-top: 2px;
  }
}
</style>
