<script>
import AppTitle from '@/components/AppTitle.vue'
import AppTabs from '@/components/AppTabs.vue'
import EditProfilePage from '@/components/pages/EditProfilePage.vue'
import EditPasswordForm from '@/components/forms/EditPasswordForm.vue'

export default {
  name: 'SettingsView',
  components: { EditPasswordForm, EditProfilePage, AppTabs, AppTitle },
  data() {
    return {
      activePage: this.$route?.query?.page || 'contacts',
      pages: [
        {
          val: 'contacts',
          label: 'Контактная информация'
        },
        {
          val: 'password',
          label: 'Данные для входа'
        }
      ]
    }
  },
  methods: {
    changeTab(page) {
      this.activePage = page
    }
  }
}
</script>

<template>
  <div class="settings-view">
    <AppTitle class="settings-view__title"> Настройки </AppTitle>
    <AppTabs
      :tabs="pages"
      :selected-tab="activePage"
      @change-tab="changeTab"
      query-name="page"
      :version="2"
    >
      <div v-if="activePage === 'contacts'">
        <EditProfilePage />
      </div>
      <div v-if="activePage === 'password'" class="password-page">
        <EditPasswordForm class="password-page__form" />
      </div>
    </AppTabs>
  </div>
</template>

<style scoped>
.settings-view__title {
  margin-bottom: 30px;
}

.password-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 144px 0 0 0;
}

.password-page__form {
  max-width: 480px;
  width: 100%;
}

@media (max-width: 991.98px) {
  .password-page {
    padding: 0;
  }
}
</style>
