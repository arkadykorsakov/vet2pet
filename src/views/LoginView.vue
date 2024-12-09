<script>
import AppTitle from '@/components/AppTitle.vue'
import LoginForm from '@/components/forms/LoginForm.vue'

export default {
  name: 'LoginView',
  components: { LoginForm, AppTitle }
}
</script>

<template>
  <div class="login">
    <AppTitle size="lg" class="login__title">Вход</AppTitle>
    <LoginForm />
  </div>
</template>

<style scoped>
.login {
  max-width: 480px;
  width: 100%;
  padding: 147px 0 460px 0;
}

.login__title {
  margin-bottom: 32px;
}
</style>
