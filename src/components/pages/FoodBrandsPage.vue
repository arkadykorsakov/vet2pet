<script>
import AppTable from "@/components/AppTable.vue";

export default {
  name: "FoodBrandsPage",
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
          "name": "Royal Canin"
        },
        {
          "id": 2,
          "name": "Purina Pro Plan"
        },
        {
          "id": 3,
          "name": "Hill's Science Diet"
        },
        {
          "id": 4,
          "name": "Acana"
        },
        {
          "id": 5,
          "name": "Orijen"
        },
        {
          "id": 6,
          "name": "Pedigree"
        },
        {
          "id": 7,
          "name": "Whiskas"
        },
        {
          "id": 8,
          "name": "Friskies"
        },
        {
          "id": 9,
          "name": "Eukanuba"
        },
        {
          "id": 10,
          "name": "Purina ONE"
        }
      ]
    }
  }
}
</script>

<template>
  <AppTable :columns="tableHeaders" :rows="fakeData"/>
</template>
