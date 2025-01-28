<script>
import AppTitle from '@/components/AppTitle.vue'
import AppSearch from '@/components/AppSearch.vue'
import AppButton from '@/components/AppButton.vue'
import AppModal from '@/components/AppModal.vue'

export default {
  name: 'DashboardControls',
  components: { AppModal, AppButton, AppSearch, AppTitle },
  props: {
    title: {
      type: String,
      required: true
    },
    searchable: {
      type: Boolean,
      default: false
    },
    addable: {
      type: Boolean,
      default: false
    },
    addButtonLabel: {
      type: String,
      default: 'Добавить +'
    },
    titleModalAdd: {
      type: String,
      default: 'Создать'
    }
  },
  emits: ['search'],
  data() {
    return {
      search: '',
      show: false
    }
  },
  watch: {
    search(value) {
      this.$emit('search', value)
    }
  },
  methods: {
    closeModal() {
      this.show = false
    },
    openModal() {
      this.show = true
    }
  }
}
</script>

<template>
  <div class="dashboard-controls">
    <div class="dashboard-controls__start">
      <AppTitle class="dashboard-controls__title">{{ title }}</AppTitle>
      <AppSearch
        v-model="search"
        v-if="searchable"
        class="dashboard-controls__search"
      />
    </div>
    <AppButton
      class="dashboard-controls__addable"
      v-if="addable"
      @click="openModal"
      >{{ addButtonLabel }}
    </AppButton>
    <teleport to="body" v-if="addable">
      <AppModal :title="titleModalAdd" :show="show" @close="closeModal">
        <slot name="modal" :close="closeModal" />
      </AppModal>
    </teleport>
  </div>
</template>

<style scoped>
.dashboard-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}
.dashboard-controls__start {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
}
.dashboard-controls:not(:last-child) {
  margin-bottom: 46px;
}

@media (max-width: 767.98px) {
  .dashboard-controls:not(:last-child) {
    margin-bottom: 26px;
  }
}
</style>
