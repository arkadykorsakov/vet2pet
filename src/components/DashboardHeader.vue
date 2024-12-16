<script>
import AppTitle from "@/components/AppTitle.vue";
import AppSearch from "@/components/AppSearch.vue";
import AppButton from "@/components/AppButton.vue";
import AppModal from "@/components/AppModal.vue";

export default {
  name: "DashboardHeader",
  components: {AppModal, AppButton, AppSearch, AppTitle},
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
      default: "Добавить +"
    },
    titleModalAdd: {
      type: String,
      default: "Создать"
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
      this.$emit("search", value)
    }
  },
  methods: {
    closeModal() {
      this.show = false
    },
    openModal() {
      this.show = true
    },
  }
}
</script>

<template>
  <header class="header">
    <AppTitle class="header__title">{{ title }}</AppTitle>
    <AppSearch v-model="search" v-if="searchable" class="header__search"/>
    <AppButton class="header__addable" v-if="addable" @click="openModal">{{ addButtonLabel }}
    </AppButton>
    <teleport to="body" v-if="addable">
      <AppModal :title="titleModalAdd" :show="show" @close="closeModal">
        <slot name="modal" :close="closeModal"/>
      </AppModal>
    </teleport>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: 24px;
}


.header__addable {
  margin-left: auto;
}
</style>