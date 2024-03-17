<template>
  <div class="code">
    <input type="hidden" :value="modelValue" />
    <input
      type="text"
      v-for="n in length"
      :key="n"
      class="code__input"
      :class="{ error: isError }"
      @input="updateCode"
      @focus="setCursor"
      @keydown.delete="deleteCode"
    />
  </div>
</template>

<script>
export default {
  props: {
    length: Number,
    isError: Boolean,
    modelValue: String,
  },
  data: () => ({
    code: "",
  }),
  computed: {
    inputs: () => document.querySelectorAll(".code__input"),
  },
  watch: {
    code(code) {
      code = code.slice(0, this.length);
      this.inputs.forEach((input, i) => {
        input.value = code[i] || "";
      });
      this.setCursor();

      document.querySelector('[type="hidden"]').value = code;
      this.$emit("update:modelValue", code);
    },
    modelValue(val) {
      this.code = val;
    },
  },
  methods: {
    updateCode() {
      let code = "";
      this.inputs.forEach((input) => {
        let val = input.value.replace(/\D/g, "");
        input.value = val;
        code += val;
      });
      this.code = code;
    },
    deleteCode() {
      this.code = this.code.slice(0, -1);
    },
    setCursor() {
      let idx = this.code.length;
      if (this.code.length >= this.length) idx = this.length - 1;
      this.inputs[idx].focus();
    },
  },
};
</script>

<style scoped lang="scss">
.code {
  display: flex;
  justify-content: center;
  gap: 16px;
}
.code__input {
  width: 15px;
  text-align: center;
  font-size: 16px;
  line-height: 24px;
  background: var(--light-gray-color);
  color: #454444;
  padding: 12px 20px;
  border-radius: 8px;
  border: 1px solid #919eab66;
  transition: 0.2s;
}
.code__input:focus {
  background: #f8faca;
  outline: none;
}
.code__input.error {
  border-color: var(--error-color);
  background-color: var(--error-bg);
  animation: error 0.2s linear both;
}
@keyframes error {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-4px);
  }
  50% {
    transform: translateX(4px);
  }
  75% {
    transform: translateX(-2px);
  }
  100% {
    transform: translateX(0);
  }
}
@media (max-width: 500px) {
  .code {
    gap: 5px;
  }
}
</style>
