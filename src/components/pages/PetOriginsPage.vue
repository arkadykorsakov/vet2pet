<script>
import AppTable from "@/components/AppTable.vue";

export default {
  name: "PetOriginsPage",
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
          "name": "Домашнее разведение"
        },
        {
          "id": 2,
          "name": "Питомник"
        },
        {
          "id": 3,
          "name": "Спасение с улицы"
        },
        {
          "id": 4,
          "name": "Приют"
        },
        {
          "id": 5,
          "name": "Покупка у заводчика"
        },
        {
          "id": 6,
          "name": "Покупка в зоомагазине"
        },
        {
          "id": 7,
          "name": "Подарок"
        },
        {
          "id": 8,
          "name": "Найдено в природе"
        },
        {
          "id": 9,
          "name": "Обмен"
        },
        {
          "id": 10,
          "name": "Служебное разведение (например, для работы в полиции или спасательных службах)"
        }
      ]
    }
  }
}
</script>

<template>
  <AppTable :columns="tableHeaders" :rows="fakeData"/>
</template>
