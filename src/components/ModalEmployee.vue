<template>
  <AppModal :active="active" :title="modalTitle" @close="close">
    <form @submit.prevent="sendForm" class="form">
      <AppInput
        placeholder="E-mail"
        v-model="email"
        class="dark-bg"
        :error="v$.email.$error"
        :errorText="errorEmail"
      />
      <AppInput
        placeholder="Должность"
        v-model="role"
        class="dark-bg"
        :error="v$.role.$error"
        errorText="Поле не заполнено"
      />

      <div class="salary-block">
        <h6 class="salary-block__title">Заработная плата</h6>
        <div class="salary-block__row">
          <AppDropdown :list="listSalaryType" v-model="salaryType" />
          <AppInput
            placeholder="Сумма"
            v-model="salary"
            class="dark-bg"
            :error="v$.salary.$error"
            :errorText="errorSalary"
            :iconRight="require('@/assets/img/icons/rub.svg')"
          />
        </div>
      </div>

      <AppTextarea placeholder="Описание" v-model="desc" class="dark-bg" />

      <div class="form__footer">
        <AppBtn @click.prevent="close" class="cancel full-w">Отмена</AppBtn>
        <AppBtn class="full-w">{{ modalBtn }}</AppBtn>
      </div>
    </form>
  </AppModal>
</template>

<script>
import AppModal from "@/components/AppModal";
import AppInput from "@/components/AppInput";
import AppTextarea from "@/components/AppTextarea";
import AppBtn from "@/components/AppBtn";
import AppDropdown from "@/components/AppDropdown";

import { useVuelidate } from "@vuelidate/core";
import { required, email, numeric } from "@vuelidate/validators";

export default {
  emits: ["close"],
  setup() {
    return { v$: useVuelidate() };
  },
  props: {
    active: Boolean,
    employee: {
      type: [Object, Boolean],
      required: false,
    },
  },
  components: { AppModal, AppInput, AppTextarea, AppBtn, AppDropdown },
  data() {
    return {
      role: "",
      email: "",
      salaryType: "hour",
      salary: "",
      desc: "",
      listSalaryType: [
        { id: "hour", label: "Почасовая" },
        { id: "fix", label: "Фиксированная" },
      ],
    };
  },
  computed: {
    modalTitle() {
      return this.employee ? "Редактировать сотрудника" : "Добавить сотрудника";
    },
    modalBtn() {
      return this.employee ? "Сохранить" : "Добавить";
    },
    errorEmail() {
      if (!this.v$.email.$error) return "";
      if (this.v$.email.required.$invalid) return "Поле не заполнено";
      if (this.v$.email.email.$invalid) return "Неверный email";
      return "Неизвестная ошибка";
    },
    errorSalary() {
      if (!this.v$.salary.$error) return "";
      if (this.v$.salary.required.$invalid) return "Поле не заполнено";
      if (this.v$.salary.numeric.$invalid) return "Должно быть число";
      return "Неизвестная ошибка";
    },
  },
  watch: {
    employee: {
      handler() {
        if (!this.employee) return;

        this.role = this.employee.role;
        this.email = this.employee.email;
        this.salaryType = this.employee.salaryType;
        this.salary = this.employee.salary;
        this.desc = this.employee.desc;
      },
      deep: true,
    },
  },
  validations() {
    return {
      role: { required },
      email: { required, email },
      salary: { required, numeric },
    };
  },
  methods: {
    close() {
      setTimeout(() => {
        this.role = "";
        this.email = "";
        this.salary = "";
        this.desc = "";
        this.v$.$reset();
      }, 300);

      this.$emit("close");
    },
    sendForm() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      const data = {
        role: this.role,
      };
      console.log(data);

      this.close();
      // this.$store.dispatch("createCompanies", data).then(() => {
      // при успехе открывать компанию
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
.salary-block {
  &__title {
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 600;
  }
  &__row {
    display: flex;
    gap: 20px;
    justify-content: flex-start;
  }
}
</style>
