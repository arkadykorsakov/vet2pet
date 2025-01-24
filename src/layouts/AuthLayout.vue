<script>
import AuthHeader from '@/components/AuthHeader.vue'

export default {
  name: 'AuthLayout',
  components: {
    AuthHeader
  }
}
</script>

<template>
  <div class="wrapper">
    <AuthHeader />
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
  height: 100%;
  width: 100%;
}

.auth-layout {
  flex: 1 1 auto;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 140px 24px 20px 24px;
}

@media (max-width: 991.98px) {
  .auth-layout {
    padding: 110px 24px 20px 24px;
  }
}
</style>
