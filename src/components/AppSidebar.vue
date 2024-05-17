<template>
  <div class="sidebar">
    <div class="sidebar__logo">
      <img src="@/assets/img/logo/2-light.png" alt="Лимон" />
    </div>

    <router-link to="/profile" class="profile hover">
      <div class="profile__line profile__line_start"></div>
      <div class="profile__line profile__line_end"></div>

      <div class="profile__ava"></div>
      <div class="profile__body">
        <p class="profile__name">{{ userData.name }}</p>
        <p class="profile__desc">Мой аккаунт</p>
      </div>
    </router-link>

    <div class="sidebar__links">
      <router-link
        v-for="link in sidebarLinks"
        :key="link.label"
        :to="link.link"
        class="sidebar__link hover"
      >
        <img :src="link.icon" :alt="link.label" />
        <span>{{ link.label }}</span>
      </router-link>
    </div>

    <div class="sidebar__footer">
      <router-link
        v-for="link in linksFooterList"
        :key="link.label"
        :to="link.link ?? ''"
        @click="link.func"
        class="sidebar__link hover"
      >
        <img :src="link.icon" :alt="link.label" />
        <span>{{ link.label }}</span>
      </router-link>
    </div>
  </div>

  <ModalFeedback :active="modalFeedback" @close="modalFeedback = false" />
</template>

<script>
import ModalFeedback from "@/components/ModalFeedback";

import { mapGetters } from "vuex";

export default {
  components: { ModalFeedback },
  data() {
    return {
      modalFeedback: false,
      linksFooterList: [
        {
          icon: require("@/assets/img/icons/message.svg"),
          label: "Обр. связь",
          func: () => (this.modalFeedback = true),
        },
        {
          icon: require("@/assets/img/icons/settings.svg"),
          label: "Настройки",
          link: "/settings",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["userData", "sidebarLinks", "sidebarLinksFooter"]),
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  min-width: 265px;
  max-width: 265px;
  min-height: 100vh;
  background-color: var(--dark-color-2);
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.27);
  display: flex;
  flex-direction: column;
  animation: occurrence 0.5s ease both;

  &__logo {
    padding: 14px 20px;
    img {
      max-width: 150px;
      display: block;
    }
  }
  &__links {
  }
  &__link {
    padding: 13px 20px;
    display: flex;
    align-items: center;
    text-decoration: none;
    gap: 15px;
    color: #fff;
    font-size: 18px;
    background: transparent;
    cursor: pointer;
    position: relative;

    img {
      min-width: 25px;
      max-width: 25px;
    }
  }
  &__footer {
    margin-top: auto;
  }
}
.profile {
  padding: 14px 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;

  &__line {
    height: 2px;
    width: 100%;
    position: absolute;
    left: 0;
    background-image: linear-gradient(
      90deg,
      #b3b2b2 0%,
      rgba(49, 49, 49, 0) 100%
    );
    &_start {
      top: 0;
    }
    &_end {
      bottom: 0;
    }
  }

  &__ava {
    min-width: 40px;
    max-width: 40px;
    height: 40px;
    background-image: url("@/assets/img/no-avatar.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 100px;
    overflow: hidden;
  }
  &__name {
    font-size: 18px;
    font-weight: 500;
    color: #fff;
    line-height: 1.1;
  }
  &__desc {
    font-size: 13px;
    color: #929292;
    line-height: 1.1;
  }
}

.hover {
  position: relative;
  &::before {
    content: "";
    display: block;
    position: absolute;
    height: 100%;
    width: 100%;
    max-width: 0;
    top: 0;
    left: 0;
    background: linear-gradient(
      90deg,
      rgba(243, 242, 224, 0.53) 0%,
      rgba(49, 49, 49, 0) 100%
    );
    transition: 0.2s;
    z-index: 0;
  }

  * {
    transition: 0.3s;
  }
  &:hover {
    &::before {
      max-width: 100%;
    }
    > * {
      transform: translateX(10px);
    }
  }
}

@keyframes occurrence {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
