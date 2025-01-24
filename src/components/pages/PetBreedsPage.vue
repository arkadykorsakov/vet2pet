<script>
import AppTable from '@/components/AppTable.vue'
import PetBreedForm from '@/components/forms/PetBreedForm.vue'

export default {
  name: 'PetBreedsPage',
  components: { PetBreedForm, AppTable },
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
          name: 'Лабрадор Ретривер'
        },
        {
          id: 2,
          name: 'Персидская кошка'
        },
        {
          id: 3,
          name: 'Сибирский хаски'
        },
        {
          id: 4,
          name: 'Бенгальская кошка'
        },
        {
          id: 5,
          name: 'Золотистый ретривер'
        },
        {
          id: 6,
          name: 'Мейн-кун'
        },
        {
          id: 7,
          name: 'Немецкая овчарка'
        },
        {
          id: 8,
          name: 'Сиамская кошка'
        },
        {
          id: 9,
          name: 'Бульдог'
        },
        {
          id: 10,
          name: 'Регдолл'
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
  <AppTable
    :columns="tableHeaders"
    :rows="filteredData"
    editable
    title-modal-edit="Обновить Породу питомцев"
  >
    <template #modal>
      <PetBreedForm is-edit />
    </template>
  </AppTable>
</template>
