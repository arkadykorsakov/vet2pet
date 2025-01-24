<script>
import AppButton from '@/components/AppButton.vue'
import logo from '@/assets/img/logo.webp'
import BurgerIcon from '@/icons/BurgerIcon.vue'
import XFourthIcon from '@/icons/XFourthIcon.vue'

export default {
  name: 'AuthHeader',
  data() {
    return {
      logo,
      isOpenMenu: false
    }
  },
  components: {
    XFourthIcon,
    BurgerIcon,
    AppButton
  },
  methods: {
    toggleMenu() {
      this.isOpenMenu = !this.isOpenMenu
    },
    closeMenu() {
      this.isOpenMenu = !this.isOpenMenu
    }
  },
  watch: {
    isOpenMenu() {
      if (this.isOpenMenu) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
  },
}
</script>

<template>
  <header class="header">
    <img :src="logo" alt="Vet2Pet" class="header__logo" />
    <div class="header__menu">
      <button class="menu__burger" @click="toggleMenu">
        <BurgerIcon v-if="!isOpenMenu" />
        <XFourthIcon v-else />
      </button>
      <nav class="menu__nav" :class="{ active: isOpenMenu }">
        <RouterLink
          v-if="$route.path === '/register'"
          to="/login"
          v-slot="{ navigate }"
          custom
        >
          <AppButton
            @click="
              () => {
                navigate()
                closeMenu()
              }
            "
            class="header__btn"
            color="white"
            >Вход</AppButton
          >
        </RouterLink>
        <RouterLink
          v-if="$route.path === '/login'"
          to="/register"
          v-slot="{ navigate }"
          custom
        >
          <AppButton
            @click="
              () => {
                navigate()
                closeMenu()
              }
            "
            class="header__btn"
            color="white"
            >Регистрация</AppButton
          >
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  height: 140px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  position: fixed;
  top: 0;
  left: 0;
  padding: 32px 24px;
  z-index: 20;
}

.header__logo {
  height: 77px;
  max-width: 100%;
  z-index: 20;
}

.menu__burger {
  display: none;
}

@media (max-width: 991.98px) {
  .header {
    background: var(--surface-bright);
    padding: 16px 24px;
    height: 110px;
  }
  .header__logo {
    height: 60px;
  }
  .menu__nav {
    position: fixed;
    inset: 0;
    left: -100%;
    background: var(--on-primary);
    padding: 140px 24px 20px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.3s ease;
    overflow-y: auto;
  }
  .menu__nav::before {
    content: '';
    position: fixed;
    top: 0;
    left: -100%;
    background: var(--surface-bright);
    height: 110px;
    width: 100%;
    transition: all 0.3s ease;
  }
  .menu__burger {
    position: relative;
    display: block;
    z-index: 20;
  }
  .menu__nav.active,
  .menu__nav.active::before {
    left: 0;
  }
}
@media (max-width: 319.98px) {
  .header__logo {
    height: 40px;
  }
}
</style>
