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

<style scoped>
.code {
  display: flex;
  gap: 16px;
}
.code__input {
  width: 100%;
  color: #212b36;
  text-align: center;
  font-size: 16px;
  line-height: 24px;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid #919eab66;
}
.code__input:focus {
  border-color: #0088ff;
  outline: none;
}
.code__input.error {
  border-color: #ff4842;
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
