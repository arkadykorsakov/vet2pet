<script>
import AppTitle from '@/components/AppTitle.vue'

export default {
  name: 'AppBreadCrumbs',
  components: { AppTitle },
  props: {
    breadCrumbs: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <nav class="breadcrumb">
    <ul class="breadcrumb__list">
      <li v-for="(breadCrumb, idx) in breadCrumbs" :key="idx">
        <AppTitle color="third" v-if="idx !== breadCrumbs.length - 1" tag="h2">
          <RouterLink :to="breadCrumb.link">
            {{ breadCrumb.label }} /
          </RouterLink>
        </AppTitle>
        <AppTitle v-else aria-current="page" :to="breadCrumb.link" tag="h2">
          <RouterLink :to="breadCrumb.link">
            {{ breadCrumb.label }}
          </RouterLink>
        </AppTitle>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
a {
  color: currentColor;
  white-space: nowrap;
}

.breadcrumb__list {
  display: flex;
  gap: 8px;
  overflow: auto;
}
</style>
