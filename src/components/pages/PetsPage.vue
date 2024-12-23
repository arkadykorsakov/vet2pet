<script>
import AppTable from '@/components/AppTable.vue'

export default {
  name: 'PetsPage',
  components: { AppTable },
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
        { label: 'Кличка', field: 'name', sortable: true, align: 'left' },
        { label: 'Владелец', field: 'fullName', sortable: true, align: 'left' },
        { label: 'Вес', field: 'weight', sortable: true, align: 'left' },
        { label: 'Чип', field: 'chip_number', sortable: true, align: 'left' }
      ],
      fakeData: [
        {
          id: 1,
          name: 'Барсик',
          fullName: 'Иванов Иван Сергеевич',
          weight: 4.5,
          chip_number: 'CHIP123456'
        },
        {
          id: 2,
          name: 'Мурка',
          fullName: 'Петрова Анна Михайловна',
          weight: 3.8,
          chip_number: 'CHIP654321'
        },
        {
          id: 3,
          name: 'Шарик',
          fullName: 'Сидоров Алексей Николаевич',
          weight: 12.1,
          chip_number: 'CHIP987654'
        },
        {
          id: 4,
          name: 'Рекс',
          fullName: 'Кузнецов Дмитрий Александрович',
          weight: 25.3,
          chip_number: 'CHIP456789'
        },
        {
          id: 5,
          name: 'Бобик',
          fullName: 'Смирнова Елена Васильевна',
          weight: 7.9,
          chip_number: 'CHIP123789'
        },
        {
          id: 6,
          name: 'Лайма',
          fullName: 'Новиков Артем Владимирович',
          weight: 10.4,
          chip_number: 'CHIP741258'
        },
        {
          id: 7,
          name: 'Белка',
          fullName: 'Попова Татьяна Викторовна',
          weight: 5.2,
          chip_number: 'CHIP369852'
        },
        {
          id: 8,
          name: 'Стрелка',
          fullName: 'Соколов Сергей Борисович',
          weight: 6.3,
          chip_number: 'CHIP852963'
        },
        {
          id: 9,
          name: 'Джек',
          fullName: 'Михайлов Павел Геннадьевич',
          weight: 9.5,
          chip_number: 'CHIP456123'
        },
        {
          id: 10,
          name: 'Малыш',
          fullName: 'Федорова Ольга Анатольевна',
          weight: 2.4,
          chip_number: 'CHIP147258'
        },
        {
          id: 11,
          name: 'Черныш',
          fullName: 'Григорьев Михаил Романович',
          weight: 18.6,
          chip_number: 'CHIP951753'
        },
        {
          id: 12,
          name: 'Рыжик',
          fullName: 'Ковалев Владимир Дмитриевич',
          weight: 4.9,
          chip_number: 'CHIP753951'
        },
        {
          id: 13,
          name: 'Луна',
          fullName: 'Зайцева Алина Евгеньевна',
          weight: 3.3,
          chip_number: 'CHIP258369'
        },
        {
          id: 14,
          name: 'Снежок',
          fullName: 'Гусев Олег Сергеевич',
          weight: 7.0,
          chip_number: 'CHIP369147'
        },
        {
          id: 15,
          name: 'Тоша',
          fullName: 'Васильев Артур Александрович',
          weight: 4.2,
          chip_number: 'CHIP1234567'
        },
        {
          id: 16,
          name: 'Зорро',
          fullName: 'Морозова Виктория Алексеевна',
          weight: 11.2,
          chip_number: 'CHIP765432'
        },
        {
          id: 17,
          name: 'Рада',
          fullName: 'Тихонов Алексей Николаевич',
          weight: 8.7,
          chip_number: 'CHIP567890'
        },
        {
          id: 18,
          name: 'Граф',
          fullName: 'Мельников Василий Иванович',
          weight: 15.4,
          chip_number: 'CHIP890123'
        },
        {
          id: 19,
          name: 'Тайга',
          fullName: 'Карпова Наталья Дмитриевна',
          weight: 22.8,
          chip_number: 'CHIP321654'
        },
        {
          id: 20,
          name: 'Зефир',
          fullName: 'Николаев Дмитрий Аркадьевич',
          weight: 3.0,
          chip_number: 'CHIP753159'
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
    :rows="filteredData"
    :columns="tableHeaders"
    detailable
    detail-url="/pets"
    detail-param="id"
  />
</template>
