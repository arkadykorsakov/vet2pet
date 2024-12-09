<template>
  <div>
    <AppSidebar/>
    <h1>Dashboard</h1>
    <slot/>
  </div>
</template>

<script>
import AppSidebar from "@/components/AppSidebar.vue";

export default {
  name: "DashboardLayout",
  components: {
    AppSidebar
  }
}
</script>