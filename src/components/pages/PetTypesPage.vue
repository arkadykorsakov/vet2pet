<script>
import AppTable from "@/components/AppTable.vue";

export default {
  name: "PetTypesPage",
  components: {AppTable},
  data() {
    return {
      tableHeaders: [
        {
          label: "#", field: "id", sortable: true, align: 'left', style: 'width: 20px'
        },
        {
          label: "Наименование", field: "name", sortable: true, align: 'left'
        },
      ], fakeData: [
        {
          "id": 1,
          "name": "Собака"
        },
        {
          "id": 2,
          "name": "Кошка"
        },
        {
          "id": 3,
          "name": "Птица"
        },
        {
          "id": 4,
          "name": "Рыба"
        },
        {
          "id": 5,
          "name": "Грызун"
        },
        {
          "id": 6,
          "name": "Пресмыкающееся"
        },
        {
          "id": 7,
          "name": "Земноводное"
        },
        {
          "id": 8,
          "name": "Насекомое"
        },
        {
          "id": 9,
          "name": "Конь"
        },
        {
          "id": 10,
          "name": "Кролик"
        }
      ]
    }
  }
}
</script>

<template>
  <AppTable :columns="tableHeaders" :rows="fakeData"/>
</template>
