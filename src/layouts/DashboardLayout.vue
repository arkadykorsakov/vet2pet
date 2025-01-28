<script>
import TheSidebar from '@/components/TheSidebar.vue'
import DashboardHeader from '@/components/DashboardHeader.vue'

export default {
  name: 'DashboardLayout',
  components: {
    TheSidebar,
    DashboardHeader
  },
  data() {
    return {
      isOpenSidebar: false
    }
  },
  methods: {
    openSidebar() {
      this.isOpenSidebar = true
    },
    closeSidebar() {
      this.isOpenSidebar = false
    }
  }
}
</script>

<template>
  <div class="dashboard-layout">
    <TheSidebar
      class="dashboard-sidebar"
      :class="{ active: isOpenSidebar }"
      @change-page="closeSidebar"
    />
    <div>
      <DashboardHeader class="dashboard-header" @open-menu="openSidebar" />
      <main class="main">
        <slot />
      </main>
    </div>
    <div
      class="dashboard-sidebar__wrapper"
      :class="{ active: isOpenSidebar }"
      @click="closeSidebar"
    ></div>
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
.dashboard-header {
  display: none;
}
@media (max-width: 991.98px) {
  .main {
    margin-left: 0;
    padding: 154px 20px 44px;
  }
  .dashboard-header {
    display: flex;
  }
  .dashboard-sidebar {
    left: -200%;
    transition: all 0.3s ease;
  }
  .dashboard-sidebar.active {
    left: 0;
  }
  .dashboard-sidebar__wrapper {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #000;
    z-index: 35;
    backdrop-filter: blur(16px);
    background: rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: all 0.3s ease;
  }
  .dashboard-sidebar__wrapper.active {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
  }
}
@media (max-width: 991.98px) {
  .main {
    padding: 134px 20px 44px;
  }
}
</style>
