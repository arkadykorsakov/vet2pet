<script>
import DashboardControls from '@/components/DashboardControls.vue'
import AppTable from '@/components/AppTable.vue'
import VetServiceForm from '@/components/forms/VetServiceForm.vue'

export default {
  name: 'VetServices',
  components: { VetServiceForm, AppTable, DashboardControls },
  data() {
    return {
      search: '',
      tableHeaders: [
        {
          label: '#',
          field: 'id',
          sortable: true,
          align: 'left',
          style: 'width: 20px'
        },
        { label: 'Услуга', field: 'name', sortable: true, align: 'left' },
        {
          label: 'Цена',
          field: 'price',
          sortable: true,
          align: 'left',
          format: 'currency'
        },
        {
          label: 'Добавлена',
          field: 'created',
          sortable: true,
          align: 'left',
          format: 'datetime'
        }
      ],
      fakeData: [
        {
          id: 1,
          name: 'Общий осмотр животного',
          price: '1200',
          created: '2024-06-01'
        },
        {
          id: 2,
          name: 'Вакцинация от бешенства',
          price: '800',
          created: '2024-06-02'
        },
        { id: 3, name: 'Чипирование', price: '1500', created: '2024-06-03' },
        { id: 4, name: 'Удаление клеща', price: '600', created: '2024-06-03' },
        {
          id: 5,
          name: 'Обработка от паразитов',
          price: '1000',
          created: '2024-06-04'
        },
        {
          id: 6,
          name: 'УЗИ диагностика',
          price: '2500',
          created: '2024-06-04'
        },
        {
          id: 7,
          name: 'Стерилизация кошки',
          price: '4000',
          created: '2024-06-05'
        },
        { id: 8, name: 'Кастрация кота', price: '3000', created: '2024-06-05' },
        {
          id: 9,
          name: 'Чистка зубов ультразвуком',
          price: '1800',
          created: '2024-06-06'
        },
        {
          id: 10,
          name: 'Хирургическое удаление опухоли',
          price: '7000',
          created: '2024-06-07'
        },
        {
          id: 11,
          name: 'Рентгенологическое исследование',
          price: '2000',
          created: '2024-06-08'
        },
        {
          id: 12,
          name: 'Взятие анализов крови',
          price: '1200',
          created: '2024-06-09'
        },
        {
          id: 13,
          name: 'Гигиеническая стрижка',
          price: '1000',
          created: '2024-06-10'
        },
        {
          id: 14,
          name: 'Офтальмологическое обследование',
          price: '1700',
          created: '2024-06-11'
        },
        {
          id: 15,
          name: 'Операция на суставе',
          price: '8500',
          created: '2024-06-12'
        },
        {
          id: 16,
          name: 'Кардиологическое обследование',
          price: '2800',
          created: '2024-06-13'
        },
        {
          id: 17,
          name: 'Обработка ушей от инфекции',
          price: '900',
          created: '2024-06-14'
        },
        {
          id: 18,
          name: 'Переливание крови',
          price: '5000',
          created: '2024-06-15'
        },
        { id: 19, name: 'Снятие швов', price: '500', created: '2024-06-15' },
        {
          id: 20,
          name: 'Вызов ветеринара на дом',
          price: '3000',
          created: '2024-06-16'
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
  <div class="vet-services-view">
    <DashboardControls
      title="Ветеринарные услуги"
      searchable
      addable
      @search="(val) => (search = val)"
      title-modal-add="Добавление услуги"
    >
      <template #modal="{ close }">
        <VetServiceForm @close="close" />
      </template>
    </DashboardControls>
    <AppTable
      :rows="filteredData"
      :columns="tableHeaders"
      editable
      title-modal-edit="Редактирование услуги"
    >
      <template #modal="{ close }">
        <VetServiceForm @close="close" is-edit />
      </template>
    </AppTable>
  </div>
</template>
