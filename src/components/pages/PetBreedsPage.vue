<script>
import AppTable from "@/components/AppTable.vue";

export default {
  name: "PetBreedsPage",
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
      ],
      fakeData: [
        {
          "id": 1,
          "name": "Лабрадор Ретривер"
        },
        {
          "id": 2,
          "name": "Персидская кошка"
        },
        {
          "id": 3,
          "name": "Сибирский хаски"
        },
        {
          "id": 4,
          "name": "Бенгальская кошка"
        },
        {
          "id": 5,
          "name": "Золотистый ретривер"
        },
        {
          "id": 6,
          "name": "Мейн-кун"
        },
        {
          "id": 7,
          "name": "Немецкая овчарка"
        },
        {
          "id": 8,
          "name": "Сиамская кошка"
        },
        {
          "id": 9,
          "name": "Бульдог"
        },
        {
          "id": 10,
          "name": "Регдолл"
        }
      ]
    }
  }
}
</script>

<template>
  <AppTable :columns="tableHeaders" :rows="fakeData"/>
</template>
