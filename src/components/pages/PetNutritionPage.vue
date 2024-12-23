<script>
import AppTable from '@/components/AppTable.vue'
import PetNutritionForm from '@/components/forms/PetNutritionForm.vue'

export default {
  name: 'PetNutritionPage',
  components: { PetNutritionForm, AppTable },
  props: {
    search: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      tableHeaders: [
        {
          label: '#',
          field: 'id',
          sortable: true,
          align: 'left',
          style: 'width: 20px'
        },
        {
          label: 'Наименование',
          field: 'name',
          sortable: true,
          align: 'left'
        }
      ],
      fakeData: [
        {
          id: 1,
          name: 'Сухой корм'
        },
        {
          id: 2,
          name: 'Влажный корм'
        },
        {
          id: 3,
          name: 'Натуральное питание'
        },
        {
          id: 4,
          name: 'Смешанное питание'
        },
        {
          id: 5,
          name: 'Диетический корм'
        },
        {
          id: 6,
          name: 'Замороженное мясо'
        },
        {
          id: 7,
          name: 'Сырые овощи и фрукты'
        },
        {
          id: 8,
          name: 'Специальные добавки'
        },
        {
          id: 9,
          name: 'Гипоаллергенное питание'
        },
        {
          id: 10,
          name: 'Хищническое питание (барф)'
        }
      ]
    }
  },
  computed: {
    filteredData() {
      return this.search
        ? [...this.fakeData].filter((item) =>
            item.name.toLowerCase().includes(this.search.toLowerCase())
          )
        : [...this.fakeData]
    }
  }
}
</script>

<template>
  <AppTable :columns="tableHeaders" :rows="filteredData" editable>
    <template #modal="{ close }">
      <PetNutritionForm is-edit @close="close" />
    </template>
  </AppTable>
</template>
