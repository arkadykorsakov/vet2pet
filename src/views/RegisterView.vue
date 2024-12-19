<script>
import AppTitle from '@/components/AppTitle.vue'
import AppTabs from '@/components/AppTabs.vue'
import ClientRegisterForm from '@/components/forms/register/ClientRegisterForm.vue'
import VeterinarianRegisterForm from '@/components/forms/register/VeterinarianRegisterForm.vue'

export default {
  name: 'RegisterView',
  components: {
    VeterinarianRegisterForm,
    ClientRegisterForm,
    AppTabs,
    AppTitle
  },
  data() {
    return {
      activeForm: this.$route?.query?.form || 'client',
      forms: [
        {
          val: 'client',
          label: 'Клиент'
        },
        {
          val: 'veterinarian',
          label: 'Ветеринар'
        }
      ]
    }
  },
  methods: {
    changeTab(form) {
      this.activeForm = form
    }
  }
}
</script>

<template>
  <div class="register">
    <AppTitle size="lg" class="register__title">Регистрация</AppTitle>
    <AppTabs :tabs="forms" :selected-tab="activeForm" @change-tab="changeTab" query-name="form">
      <div v-if="activeForm === 'client'">
        <KeepAlive>
          <ClientRegisterForm />
        </KeepAlive>
      </div>
      <div v-if="activeForm === 'veterinarian'">
        <KeepAlive>
          <VeterinarianRegisterForm />
        </KeepAlive>
      </div>
    </AppTabs>
  </div>
</template>

<style scoped>
.register {
  max-width: 480px;
  width: 100%;
  padding: 107px 0 184px 0;
}

.register__title {
  margin-bottom: 24px;
}
</style>
