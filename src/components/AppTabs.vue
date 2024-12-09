<script>
export default {
  name: "AppTabs",
  props: {
    tabs: {
      type: Array,
      required: true
    },
    selectedTab: {
      type: String,
      required: false
    }
  },
  emits: ['changeTab'],
}
</script>

<template>
  <div class="tab" v-if="tabs.length">
    <ul class="tab-nav">
      <li class="tab-nav__item" v-for="tab in tabs" :key="tab.val">
        <button class="tab-nav__link" :class="{active:selectedTab === tab.val}" @click="$emit('changeTab', tab.val)">
          {{ tab.label }}
        </button>
      </li>
    </ul>
    <div class="tab-content">
      <slot/>
    </div>
  </div>
</template>

<style scoped>
.tab-nav {
  display: flex;
  border-bottom: 2px solid var(--inverse-primary);
  justify-content: space-between;
  margin-bottom: 24px;
}

.tab-nav__item {
  flex: 1 1 auto;
}

.tab-nav__link {
  padding: 18px;
  letter-spacing: 0.1px;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.4;
  text-transform: uppercase;
  -webkit-border-radius: 8px 8px 0 0;
  -moz-border-radius: 8px 8px 0 0;
  border-radius: 8px 8px 0 0;
  border: 2px solid var(--inverse-primary);
  border-bottom: none;
  color: var(--secondary-container);
  width: 100%;
}

.tab-nav__link.active {
  background: var(--inverse-primary);
  color: #000;

}

.tab-nav__item:not(:last-child) {
  margin-right: 8px;
}
</style>