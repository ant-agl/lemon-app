<template>
  <div class="login-form-container">
    <div class="form-container">
      <p class="title">Вход</p>
      <p class="subtitle">Войдите, чтобы продолжить</p>

      <div class="icon-container">
        <a href="/">
          <svg class="icon google" width="42" height="42" viewBox="0 0 43 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.5 0C9.90078 0 0.5 9.40078 0.5 21C0.5 32.5992 9.90078 42 21.5 42C33.0992 42 42.5 32.5992 42.5 21C42.5 9.40078 33.0992 0 21.5 0ZM29.3258 29.7035C27.4227 31.459 24.8223 32.4844 21.7297 32.4844C17.2426 32.4844 13.3625 29.9086 11.4758 26.1598C10.6965 24.6094 10.2535 22.8539 10.2535 21C10.2535 19.1461 10.6965 17.3906 11.4758 15.8402C13.3625 12.0832 17.2426 9.51562 21.7297 9.51562C24.8223 9.51562 27.4227 10.6559 29.416 12.5098L26.1266 15.8074C24.9371 14.6672 23.4195 14.093 21.7379 14.093C18.7437 14.093 16.2172 16.1109 15.3148 18.8262C15.0852 19.5152 14.9539 20.2535 14.9539 21.0082C14.9539 21.7711 15.0852 22.5012 15.3148 23.1902C16.2172 25.9055 18.752 27.9234 21.7379 27.9234C23.2883 27.9234 24.6008 27.5133 25.6262 26.8242C26.8484 26.0121 27.6523 24.798 27.9148 23.3543H21.7379V18.9082H32.5496C32.6891 19.6629 32.7547 20.4422 32.7547 21.2543C32.7465 24.757 31.4996 27.702 29.3258 29.7035Z" />
          </svg>
        </a>
        <a href="/">
          <div class="icon yandex">
            <img src="../assets/icons/yandex-icon.svg" alt="ya" class="" />
          </div>
        </a>
        <a href="/">
          <svg class="icon icon-last vk" width="42" height="42" viewBox="0 0 43 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 0C9.40187 0 0 9.40187 0 21C0 32.5981 9.40187 42 21 42C32.5981 42 42 32.5981 42 21C42 9.40187 32.5981 0 21 0ZM29.0763 23.6928C29.0763 23.6928 30.9334 25.5259 31.3906 26.3769C31.4037 26.3944 31.4103 26.4119 31.4147 26.4206C31.6006 26.7334 31.6444 26.9762 31.5525 27.1578C31.3994 27.4597 30.8744 27.6084 30.695 27.6216H27.4138C27.1863 27.6216 26.7094 27.5625 26.1319 27.1644C25.6878 26.8538 25.2503 26.3441 24.8238 25.8475C24.1872 25.1081 23.6359 24.4694 23.0803 24.4694C23.0097 24.4693 22.9396 24.4803 22.8725 24.5022C22.4525 24.6378 21.9144 25.2372 21.9144 26.8341C21.9144 27.3328 21.5206 27.6194 21.2428 27.6194H19.74C19.2281 27.6194 16.5616 27.44 14.1991 24.9484C11.3072 21.8969 8.70406 15.7762 8.68219 15.7194C8.51812 15.3234 8.85719 15.1112 9.22688 15.1112H12.5409C12.9828 15.1112 13.1272 15.3803 13.2278 15.6187C13.3459 15.8966 13.7791 17.0012 14.49 18.2437C15.6428 20.2694 16.3494 21.0919 16.9159 21.0919C17.0222 21.0906 17.1265 21.0636 17.22 21.0131C17.9594 20.6019 17.8216 17.9659 17.7887 17.4191C17.7887 17.3162 17.7866 16.24 17.4081 15.7237C17.1369 15.3497 16.6753 15.2075 16.3953 15.155C16.5086 14.9986 16.658 14.8718 16.8306 14.7853C17.3381 14.5316 18.2525 14.4944 19.1603 14.4944H19.6656C20.65 14.5075 20.9038 14.5709 21.2603 14.6606C21.9822 14.8334 21.9975 15.2994 21.9341 16.8941C21.9144 17.3469 21.8947 17.8588 21.8947 18.4625C21.8947 18.5938 21.8881 18.7337 21.8881 18.8825C21.8663 19.6941 21.84 20.615 22.4131 20.9934C22.4879 21.0403 22.5743 21.0653 22.6625 21.0656C22.8616 21.0656 23.4609 21.0656 25.0841 18.2809C25.5846 17.3846 26.0196 16.4532 26.3856 15.4941C26.4184 15.4372 26.5147 15.2622 26.6284 15.1944C26.7124 15.1516 26.8055 15.1298 26.8997 15.1309H30.7956C31.22 15.1309 31.5109 15.1944 31.5656 15.3584C31.6619 15.6187 31.5481 16.4128 29.7697 18.8213L28.9756 19.8691C27.3634 21.9822 27.3634 22.0894 29.0763 23.6928Z" />
          </svg>
        </a>
      </div>
    
      <div class="input-container" :class="{ 'error': emailError }">
        <img src="../assets/icons/mail.svg" alt="Email Icon" class="input-icon" />
        <input type="email" placeholder="E-mail" v-model="email" />

      </div>
      <p class="error-message" v-if="emailError">{{ emailError }}</p>
      <div class="input-container" :class="{ 'error': passwordError }">
        <img src="../assets/icons/padlock.svg" alt="Password Icon" class="input-icon" />
        <input :type="showPassword ? 'text' : 'password'" placeholder="Пароль" v-model="password" />
        <img
          v-if="showPassword"
          @click="togglePasswordVisibility"
          src="../assets/icons/invisible.svg"
          alt="Hide Password"
          class="password-icon"
        />
        <img
          v-else
          @click="togglePasswordVisibility"
          src="../assets/icons/visible-open.svg"
          alt="Show Password"
          class="password-icon"
        />

      </div>
      <p class="error-message" v-if="passwordError">{{ passwordError }}</p>
      <a href="#" class="forgot-password">Забыли пароль?</a>

      <button @click="login">Войти</button>

      <p class="privacy-policy-text">
        Авторизуясь, вы соглашаетесь с 
        <a href="#" class="privacy-policy-link">правилами обработки персональных данных</a>
      </p>
      <p class="registration-text">
        Еще нет аккаунта?
        <a href="#" class="registration-link">Зарегистрируйтесь</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      emailError: '',
      passwordError: '',
      formSubmitted: false,
    };
  },
  watch: {
  email() {
    this.validateEmail();
  },
  password() {
    this.validatePassword();
  },
},

  computed: {
    isFormValid() {
      return this.emailIsValid() && this.passwordIsValid();
    },
  },
  methods: {
    login() {
      this.formSubmitted = true; 
      if (this.isFormValid) {
        console.log('Вход выполнен успешно');
        this.emailError = '';
        this.passwordError = '';
        window.location.href = "/";
      } else {
        this.validateEmail();
        this.validatePassword();
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.emailError = (!this.email || !emailRegex.test(this.email)) && this.formSubmitted
        ? 'Неверно указан адрес электронной почты'
        : '';
    },
    validatePassword() {
      this.passwordError = (!this.password || this.password.length < 8) && this.formSubmitted
        ? 'Пароль должен быть не менее 8 символов'
        : '';
    },
    emailIsValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !this.email || emailRegex.test(this.email);
    },
    passwordIsValid() {
      return !this.password || this.password.length >= 8;
    },
  },
};
</script>

<style scoped>

.login-form-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 380px;
  margin: 0 auto;
  text-align: center;
  background-color: #fff;
  padding: 30px 80px;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: 'Nunito', sans-serif;
  font-weight: 300;
}

.form-container{
  max-width: 370px;
  margin: 0 auto;
}

.title {
  font-size: 40px;
  font-weight: 600;
  font-family: 'Jura', sans-serif;
  margin: 0px;
}

.subtitle {
  font-size: 24px;
  margin-top: 5px;
  margin-bottom: 25px;

  
}
.icon-container {
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
}

.icon {
  width: 42px;
  height: 42px;
  margin-right: 30px;
  fill: #BBBBBB; 
  transition: fill 0.3s; 
}

.google:hover {
  fill: #13387D;
  transition: fill 0.3s;
}

.vk:hover {
  fill: #1976D2;
  transition: fill 0.3s;
}

.yandex {
  width: 42px;
  height: 42px;
  background-color: #BBBBBB; 
  border-radius: 50%;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.yandex:hover {
  transition: 0.3s;
  background-color: #FC3F1D;
}

.icon-last {
  margin-right: 0px;
}

.input-container {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  border: none;
  border-radius: 30px;
  overflow: hidden;
  background: #EAEAEA;
  width: 100%;
  height: 48px;
}

.input-icon {
  margin-left: 16px;
}

input {
  flex: 1;
  border: none;
  outline: none;
  padding: 12px 14px;
  background: #EAEAEA;
  color: #454444;
}

.password-icon {
  cursor: pointer;
  margin-right: 16px;
}


button {
  background-color: #E7EF59;
  padding: 12px 30px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  height: 48px;
  font-weight: 600;
  margin-top: 15px;
}


button:hover {
  background-color: #eaf06e;
}

.forgot-password {
  text-decoration: none;
  display: block;
  text-align: right;
  font-weight: 600;
  color: #878D28;
  font-size: 12px;
}

.privacy-policy-text {
  font-weight: 600;
  font-size: 12px;
}

.privacy-policy-link{
  text-decoration: none;
  color: #878D28;
}

.registration-text {
  font-weight: 600;
  font-size: 20px;
  margin-top: 30px;
}

.registration-link{
  text-decoration: none;
  color: #878D28;
}

.error {
  background-color: #EED5D5;
}
.error input {
  background-color: #EED5D5;
}
.error-message {
  color: #931818;
  font-size: 12px;
  font-weight: 600;
  margin-top: -10px;
}

@media(max-width: 768px){
  .login-form-container {
   padding: 30px 50px;
  } 
}

@media(max-width: 375px){
  .login-form-container {
    padding: 10px 20px;
  }
  .title {
    font-size: 30px;
  }
  .subtitle {
    font-size: 18px;
  }
  .registration-text {
    font-size: 16px;
  }
}
</style>
