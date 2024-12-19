<script>
import DashboardHeader from '@/components/DashboardHeader.vue'
import AppTabs from "@/components/AppTabs.vue";
import PetsPage from "@/components/pages/PetsPage.vue";
import PetTypesPage from "@/components/pages/PetTypesPage.vue";
import PetBreedsPage from "@/components/pages/PetBreedsPage.vue";
import DetentionConditionsPage from "@/components/pages/DetentionConditionsPage.vue";
import PlaceConditionsPage from "@/components/pages/PlaceConditionsPage.vue";
import PetNutritionPage from "@/components/pages/PetNutritionPage.vue";
import PetOriginsPage from "@/components/pages/PetOriginsPage.vue";
import FoodBrandsPage from "@/components/pages/FoodBrandsPage.vue";

export default {
  name: 'PetsView',
  components: {
    FoodBrandsPage,
    PetOriginsPage,
    PetNutritionPage,
    PlaceConditionsPage,
    DetentionConditionsPage,
    PetBreedsPage,
    PetTypesPage,
    PetsPage,
    AppTabs,
    DashboardHeader
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
    }
  }
}
</script>

<template>
  <div class="pets-view">
    <DashboardHeader title="Питомцы" searchable addable/>
    <AppTabs :tabs="pages" :selected-tab="activePage" :version="2" @change-tab="(val) => (activePage = val)"
             query-name="page">
      <div v-if="activePage === 'pets'">
        <PetsPage/>
      </div>
      <div v-if="activePage === 'pet-types'">
        <PetTypesPage/>
      </div>
      <div v-if="activePage === 'pet-breeds'">
        <PetBreedsPage/>
      </div>
      <div v-if="activePage === 'detention-conditions'">
        <DetentionConditionsPage/>
      </div>
      <div v-if="activePage === 'place-conditions'">
        <PlaceConditionsPage/>
      </div>
      <div v-if="activePage === 'food-brands'">
        <FoodBrandsPage/>
      </div>
      <div v-if="activePage === 'pet-nutrition'">
        <PetNutritionPage/>
      </div>
      <div v-if="activePage === 'pet-origins'">
        <PetOriginsPage/>
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