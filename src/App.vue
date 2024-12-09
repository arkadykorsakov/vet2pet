<script>
import AuthLayout from "./layouts/AuthLayout.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";

export default {
  computed: {
    layout() {
      return this.$route?.meta?.layout ?? 'auth'
    },
  },
  components: {
    AuthLayout, DashboardLayout
  }
}
</script>

<template>
  <component :is="`${layout}-layout`">
    <RouterView/>
  </component>
</template>

