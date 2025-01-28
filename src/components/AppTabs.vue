<script>
export default {
  name: 'AppTabs',
  props: {
    tabs: {
      type: Array,
      required: true
    },
    selectedTab: {
      type: String,
      required: false
    },
    queryName: {
      type: String,
      default: 'tab'
    },
    version: {
      type: Number,
      default: 1,
      validator: (v) => [1, 2].includes(v)
    }
  },
  emits: ['changeTab'],
  methods: {
    changeTab(activeTab) {
      this.$emit('changeTab', activeTab)
      this.$router.push({ query: { [this.queryName]: activeTab } })
    }
  }
}
</script>

<template>
  <div class="tab" :class="[`version-${version}`]" v-if="tabs.length">
    <ul class="tab-nav">
      <li class="tab-nav__item" v-for="tab in tabs" :key="tab.val">
        <button
          class="tab-nav__link"
          :class="{ active: selectedTab === tab.val }"
          @click="changeTab(tab.val)"
        >
          {{ tab.label }}
        </button>
      </li>
    </ul>
    <div class="tab-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.tab-nav {
  overflow: auto;
  max-width: 100%;
}

.tab-nav__link {
  white-space: nowrap;
}

.tab-nav::-webkit-scrollbar {
  height: 5px;
}

.tab-nav::-webkit-scrollbar-track {
  background: #d5f2ef;
}

.tab-nav::-webkit-scrollbar-thumb {
  background: #abe4de;
  border-radius: 4px;
}

.tab.version-1 .tab-nav {
  display: flex;
  border-bottom: 2px solid var(--inverse-primary);
  justify-content: space-between;
  margin-bottom: 24px;
}

.tab.version-2 .tab-nav {
  display: inline-flex;
  margin-bottom: 56px;
}

.tab.version-1 .tab-nav__item {
  flex: 1 1 auto;
}

.tab.version-1 .tab-nav__link {
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
  transition: all 0.3s ease;
  display: block;
  height: 100%;
}

.tab.version-2 .tab-nav__link {
  background: var(--opacity-008);
  padding: 8px 12px;
  color: #000;
  display: block;
  border-radius: 8px 8px 0 0;
  letter-spacing: 0.1px;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.4;
  border-bottom: 1px solid var(--outline);
  transition: all 0.3s ease;
  display: block;
  height: 100%;
}

.tab.version-1 .tab-nav__link.active {
  background: var(--inverse-primary);
  color: #000;
}

.tab.version-2 .tab-nav__link.active {
  background: var(--secondary-container);
  color: var(--on-primary);
  border-bottom: 1px solid var(--secondary-container);
}

.tab.version-1 .tab-nav__item:not(:last-child) {
  margin-right: 8px;
}

.tab.version-2 .tab-nav__item:not(:last-child) {
  margin-right: 2px;
}

@media (max-width: 767.98px) {
  .tab.version-2 .tab-nav {
    margin-bottom: 26px;
  }
}
</style>
