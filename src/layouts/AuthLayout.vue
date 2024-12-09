<script>
import logo from '@/assets/img/logo.webp'
import AppButton from '@/components/AppButton.vue'

export default {
  name: 'AuthLayout',
  components: { AppButton },
  data() {
    return {
      logo
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <header class="header">
      <img :src="logo" alt="Vet2Pet" class="header__logo" />
      <RouterLink
        v-if="$route.path === '/register'"
        to="/login"
        v-slot="{ navigate }"
        custom
      >
        <AppButton @click="navigate" class="header__btn" color="white"
          >Вход</AppButton
        >
      </RouterLink>
      <RouterLink
        v-if="$route.path === '/login'"
        to="/register"
        v-slot="{ navigate }"
        custom
      >
        <AppButton @click="navigate" class="header__btn" color="white"
          >Регистрация</AppButton
        >
      </RouterLink>
    </header>
    <main class="auth-layout">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  width: 100%;
  padding: 32px 24px;
}

.header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
}

.header__logo {
  max-height: 77px;
  max-width: 100%;
}

.auth-layout {
  flex: 1 1 auto;
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>
