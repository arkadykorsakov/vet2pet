<script>
import logo from '@/assets/img/logo.webp'
import BurgerIcon from '@/icons/BurgerIcon.vue'

export default {
  name: 'DashboardHeader',
  components: { BurgerIcon },
  data() {
    return {
      logo
    }
  },
  emits: ['openMenu']
}
</script>

<template>
  <header class="header">
    <div class="header__start">
      <button class="header__burger" @click="$emit('openMenu')">
        <BurgerIcon />
      </button>
      <RouterLink to="/" aria-label="Главная">
        <img :src="logo" alt="Vet2Pet" class="header__logo" />
      </RouterLink>
    </div>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  height: 110px;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  z-index: 20;
  background: var(--surface-bright);
  position: fixed;
  left: 0;
  top: 0;
}

.header__start {
  display: flex;
  align-items: center;
}

.header__logo {
  height: 60px;
}

@media (max-width: 319.98px) {
  .header__logo {
    height: 40px;
  }
}
</style>
