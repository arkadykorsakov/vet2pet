<script>
import DashboardControls from '@/components/DashboardControls.vue'
import AppTabs from '@/components/AppTabs.vue'
import PetsPage from '@/components/pages/PetsPage.vue'
import PetTypesPage from '@/components/pages/PetTypesPage.vue'
import PetBreedsPage from '@/components/pages/PetBreedsPage.vue'
import DetentionConditionsPage from '@/components/pages/DetentionConditionsPage.vue'
import PlaceConditionsPage from '@/components/pages/PlaceConditionsPage.vue'
import PetNutritionPage from '@/components/pages/PetNutritionPage.vue'
import PetOriginsPage from '@/components/pages/PetOriginsPage.vue'
import FoodBrandsPage from '@/components/pages/FoodBrandsPage.vue'
import SelectFormAddablePets from '@/components/forms/SelectFormAddablePets.vue'
import PetForm from '@/components/forms/PetForm.vue'
import PetTypeForm from '@/components/forms/PetTypeForm.vue'
import PetBreedForm from '@/components/forms/PetBreedForm.vue'
import DetentionConditionForm from '@/components/forms/DetentionConditionForm.vue'
import PlaceConditionForm from '@/components/forms/PlaceConditionForm.vue'
import FoodBrandForm from '@/components/forms/FoodBrandForm.vue'
import PetNutritionForm from '@/components/forms/PetNutritionForm.vue'
import PetOriginForm from '@/components/forms/PetOriginForm.vue'

export default {
  name: 'PetsView',
  components: {
    SelectFormAddablePets,
    FoodBrandsPage,
    PetOriginsPage,
    PetNutritionPage,
    PlaceConditionsPage,
    DetentionConditionsPage,
    PetBreedsPage,
    PetTypesPage,
    PetsPage,
    AppTabs,
    DashboardControls,
    PetForm,
    PetTypeForm,
    PetBreedForm,
    DetentionConditionForm,
    PlaceConditionForm,
    FoodBrandForm,
    PetNutritionForm,
    PetOriginForm
  },
  data() {
    return {
      pages: [
        {
          val: 'pets',
          label: 'Питомцы'
        },
        {
          val: 'pet-types',
          label: 'Виды животных'
        },
        {
          val: 'pet-breeds',
          label: 'Породы'
        },
        {
          val: 'detention-conditions',
          label: 'Условия содержания'
        },
        {
          val: 'place-conditions',
          label: 'Место содержания'
        },
        {
          val: 'food-brands',
          label: 'Бренды корма'
        },
        {
          val: 'pet-nutrition',
          label: 'Питание'
        },
        {
          val: 'pet-origins',
          label: 'Происхождение'
        }
      ],
      activePage: this.$route?.query?.page || 'pets',
      activeValueForm: null,
      addableForms: {
        pets: {
          title: 'Новый питомец',
          component: 'PetForm'
        },
        'pet-types': {
          title: 'Новый вид животных',
          component: 'PetTypeForm'
        },
        'pet-breeds': {
          title: 'Новая порода',
          component: 'PetBreedForm'
        },
        'detention-conditions': {
          title: 'Новое условие содержания',
          component: 'DetentionConditionForm'
        },
        'place-conditions': {
          title: 'Новое место содержания',
          component: 'PlaceConditionForm'
        },
        'food-brands': {
          title: 'Новый бренд корма',
          component: 'FoodBrandForm'
        },
        'pet-nutrition': {
          title: 'Новое питание',
          component: 'PetNutritionForm'
        },
        'pet-origins': {
          title: 'Новое происхождение',
          component: 'PetOriginForm'
        }
      },
      search: ''
    }
  },
  computed: {
    activeForm() {
      if (!this.activeValueForm || !this.activeValueForm in this.addableForms)
        return null
      return this.addableForms[this.activeValueForm]
    }
  }
}
</script>

<template>
  <div class="pets-view">
    <DashboardControls
      title="Питомцы"
      searchable
      addable
      :title-modal-add="
        activeForm ? activeForm.title : 'Выберите что вы хотите добавить'
      "
      @search="(val) => (search = val)"
    >
      <template #modal="{ close }">
        <SelectFormAddablePets
          @change-form="(form) => (activeValueForm = form)"
          v-if="!activeValueForm"
        />
        <component
          v-else
          :is="activeForm.component"
          @cancel="() => (activeValueForm = null)"
          @close="
            () => {
              activeValueForm = null
              close()
            }
          "
        />
      </template>
    </DashboardControls>
    <AppTabs
      :tabs="pages"
      :selected-tab="activePage"
      :version="2"
      @change-tab="(val) => (activePage = val)"
      query-name="page"
    >
      <div v-if="activePage === 'pets'">
        <PetsPage :search="search" />
      </div>
      <div v-if="activePage === 'pet-types'">
        <PetTypesPage :search="search" />
      </div>
      <div v-if="activePage === 'pet-breeds'">
        <PetBreedsPage :search="search" />
      </div>
      <div v-if="activePage === 'detention-conditions'">
        <DetentionConditionsPage :search="search" />
      </div>
      <div v-if="activePage === 'place-conditions'">
        <PlaceConditionsPage :search="search" />
      </div>
      <div v-if="activePage === 'food-brands'">
        <FoodBrandsPage :search="search" />
      </div>
      <div v-if="activePage === 'pet-nutrition'">
        <PetNutritionPage :search="search" />
      </div>
      <div v-if="activePage === 'pet-origins'">
        <PetOriginsPage :search="search" />
      </div>
    </AppTabs>
  </div>
</template>

<style scoped>
:deep(.tab-nav) {
  margin-bottom: 20px !important;
}

:deep(.tab-nav__link) {
  padding: 8px 24px !important;
}
</style>
