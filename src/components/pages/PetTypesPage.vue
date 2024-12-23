<script>
import AppTable from '@/components/AppTable.vue'
import PetTypeForm from '@/components/forms/PetTypeForm.vue'

export default {
  name: 'PetTypesPage',
  components: { PetTypeForm, AppTable },
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
        },
        {
          label: 'Картинка',
          field: 'image',
          format: 'image'
        }
      ],
      fakeData: [
        {
          id: 1,
          name: 'Собака',
          image:
            'https://images.unsplash.com/photo-1505845664900-f883fde76fb0?w=1000&h=563&fit=crop'
        },
        {
          id: 2,
          name: 'Кошка',
          image:
            'https://images.unsplash.com/photo-1505845664900-f883fde76fb0?w=1000&h=563&fit=crop'
        },
        {
          id: 3,
          name: 'Птица',
          image:
            'https://images.unsplash.com/photo-1505845664900-f883fde76fb0?w=1000&h=563&fit=crop'
        },
        {
          id: 4,
          name: 'Рыба',
          image:
            'https://images.unsplash.com/photo-1505845664900-f883fde76fb0?w=1000&h=563&fit=crop'
        },
        {
          id: 5,
          name: 'Грызун',
          image:
            'https://images.unsplash.com/photo-1505845664900-f883fde76fb0?w=1000&h=563&fit=crop'
        },
        {
          id: 6,
          name: 'Пресмыкающееся',
          image:
            'https://images.unsplash.com/photo-1505845664900-f883fde76fb0?w=1000&h=563&fit=crop'
        },
        {
          id: 7,
          name: 'Земноводное',
          image:
            'https://images.unsplash.com/photo-1505845664900-f883fde76fb0?w=1000&h=563&fit=crop'
        },
        {
          id: 8,
          name: 'Насекомое',
          image:
            'https://images.unsplash.com/photo-1505845664900-f883fde76fb0?w=1000&h=563&fit=crop'
        },
        {
          id: 9,
          name: 'Конь',
          image:
            'https://images.unsplash.com/photo-1505845664900-f883fde76fb0?w=1000&h=563&fit=crop'
        },
        {
          id: 10,
          name: 'Кролик',
          image:
            'https://images.unsplash.com/photo-1505845664900-f883fde76fb0?w=1000&h=563&fit=crop'
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
    title-modal-edit="Обновить Вид питомцев"
  >
    <template #modal="{ close }">
      <PetTypeForm @close="close" is-edit />
    </template>
  </AppTable>
</template>
