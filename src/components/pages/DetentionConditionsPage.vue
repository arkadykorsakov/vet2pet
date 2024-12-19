<script>
import AppTable from "@/components/AppTable.vue";

export default {
  name: "DetentionConditionsPage",
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
          "name": "Квартира"
        },
        {
          "id": 2,
          "name": "Частный дом с участком"
        },
        {
          "id": 3,
          "name": "Уличное содержание"
        },
        {
          "id": 4,
          "name": "Вольер"
        },
        {
          "id": 5,
          "name": "Террариум"
        },
        {
          "id": 6,
          "name": "Аквариум"
        },
        {
          "id": 7,
          "name": "Клетка"
        },
        {
          "id": 8,
          "name": "Пастбище"
        },
        {
          "id": 9,
          "name": "Вольное содержание"
        },
        {
          "id": 10,
          "name": "Специальное помещение (например, питомник)"
        }
      ]
    }
  }
}
</script>

<template>
  <AppTable :columns="tableHeaders" :rows="fakeData"/>
</template>
