<script>
import AppTable from "@/components/AppTable.vue";

export default {
  name: "PetNutritionPage",
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
          "name": "Сухой корм"
        },
        {
          "id": 2,
          "name": "Влажный корм"
        },
        {
          "id": 3,
          "name": "Натуральное питание"
        },
        {
          "id": 4,
          "name": "Смешанное питание"
        },
        {
          "id": 5,
          "name": "Диетический корм"
        },
        {
          "id": 6,
          "name": "Замороженное мясо"
        },
        {
          "id": 7,
          "name": "Сырые овощи и фрукты"
        },
        {
          "id": 8,
          "name": "Специальные добавки"
        },
        {
          "id": 9,
          "name": "Гипоаллергенное питание"
        },
        {
          "id": 10,
          "name": "Хищническое питание (барф)"
        }
      ]
    }
  }
}
</script>

<template>
  <AppTable :columns="tableHeaders" :rows="fakeData"/>
</template>
