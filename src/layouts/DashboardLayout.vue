<script>
import TheSidebar from '@/components/TheSidebar.vue'

export default {
  name: 'DashboardLayout',
  components: {
    TheSidebar
  }
}
</script>

<template>
  <div class="dashboard-layout">
    <TheSidebar />
    <main class="main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.dashboard-layout {
  height: 100%;
}
.main {
  padding: 44px 32px;
  margin-left: 280px;
  min-height: 100dvh;
  overflow-y: auto;
}
</style>
