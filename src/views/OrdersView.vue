<script>
import DashboardHeader from '@/components/DashboardControls.vue'
import AppTable from '@/components/AppTable.vue'
import OrderForm from '@/components/forms/OrderForm.vue'
import DashboardControls from "@/components/DashboardControls.vue";

export default {
  name: 'OrdersView',
  components: {DashboardControls, AppTable, OrderForm },
  data() {
    return {
      tableHeaders: [
        {
          name: 'id',
          label: 'Номер',
          field: 'id',
          sortable: true,
          style: 'width: 100px'
        },
        {
          label: 'Ответственный ветеринар',
          field: 'vet_full_name',
          sortable: true
        },
        {
          label: 'Тип питомца',
          field: 'pet_type',
          sortable: true
        },
        {
          label: 'Кличка питомца',
          field: 'pet_name',
          sortable: true
        },
        {
          label: 'Цена за услугу',
          field: 'service_price',
          sortable: true,
          format: 'currency'
        },
        {
          label: 'Дата заявки',
          field: 'created',
          sortable: true,
          format: 'datetime'
        }
      ],
      fakeData: [
        {
          id: 1,
          vet_full_name: 'Иванова Ольга Сергеевна',
          pet_type: 'Собака',
          pet_name: 'Бублик',
          service_price: 4500.0,
          created: '2024-12-01T10:15:30'
        },
        {
          id: 2,
          vet_full_name: 'Петров Сергей Викторович',
          pet_type: 'Кошка',
          pet_name: 'Мурка',
          service_price: 3000.0,
          created: '2023-12-02T11:45:00'
        },
        {
          id: 3,
          vet_full_name: 'Смирнова Анна Юрьевна',
          pet_type: 'Птица',
          pet_name: 'Чижик',
          service_price: 2575.0,
          created: '2024-12-03T14:30:15'
        },
        {
          id: 4,
          vet_full_name: 'Кузнецов Михаил Андреевич',
          pet_type: 'Собака',
          pet_name: 'Макс',
          service_price: 5000.0,
          created: '2024-12-04T09:10:50'
        },
        {
          id: 5,
          vet_full_name: 'Воробьёва Наталья Алексеевна',
          pet_type: 'Кошка',
          pet_name: 'Пушок',
          service_price: 3500.0,
          created: '2024-12-05T08:20:00'
        },
        {
          id: 6,
          vet_full_name: 'Фёдоров Иван Дмитриевич',
          pet_type: 'Кролик',
          pet_name: 'Степашка',
          service_price: 2000.0,
          created: '2024-12-06T15:25:45'
        },
        {
          id: 7,
          vet_full_name: 'Павлова Мария Владимировна',
          pet_type: 'Собака',
          pet_name: 'Чарли',
          service_price: 4780.0,
          created: '2024-12-07T12:35:30'
        },
        {
          id: 8,
          vet_full_name: 'Морозов Алексей Олегович',
          pet_type: 'Кошка',
          pet_name: 'Тень',
          service_price: 3325.0,
          created: '2024-12-08T13:40:15'
        },
        {
          id: 9,
          vet_full_name: 'Соколова Виктория Игоревна',
          pet_type: 'Рыбка',
          pet_name: 'Златик',
          service_price: 1500.0,
          created: '2024-12-09T10:55:25'
        },
        {
          id: 10,
          vet_full_name: 'Алексеев Дмитрий Сергеевич',
          pet_type: 'Собака',
          pet_name: 'Рокки',
          service_price: 5500.0,
          created: '2024-12-10T14:10:10'
        },
        {
          id: 11,
          vet_full_name: 'Орлова Елена Николаевна',
          pet_type: 'Кошка',
          pet_name: 'Луна',
          service_price: 4000.0,
          created: '2024-12-11T08:15:35'
        },
        {
          id: 12,
          vet_full_name: 'Лебедев Андрей Борисович',
          pet_type: 'Птица',
          pet_name: 'Попугайчик',
          service_price: 2250.0,
          created: '2024-12-12T16:05:50'
        },
        {
          id: 13,
          vet_full_name: 'Сергеева Ирина Валерьевна',
          pet_type: 'Собака',
          pet_name: 'Белла',
          service_price: 6000.0,
          created: '2024-12-13T09:45:25'
        },
        {
          id: 14,
          vet_full_name: 'Романов Олег Евгеньевич',
          pet_type: 'Кошка',
          pet_name: 'Симба',
          service_price: 3850.0,
          created: '2024-12-14T11:20:30'
        },
        {
          id: 15,
          vet_full_name: 'Васильева Татьяна Ивановна',
          pet_type: 'Хомяк',
          pet_name: 'Кроха',
          service_price: 1800.0,
          created: '2024-12-15T14:50:00'
        },
        {
          id: 16,
          vet_full_name: 'Григорьев Артём Петрович',
          pet_type: 'Собака',
          pet_name: 'Дюк',
          service_price: 5275.0,
          created: '2024-12-16T10:25:15'
        },
        {
          id: 17,
          vet_full_name: 'Захарова Ксения Анатольевна',
          pet_type: 'Кошка',
          pet_name: 'Клео',
          service_price: 3620.0,
          created: '2024-12-17T15:05:40'
        },
        {
          id: 18,
          vet_full_name: 'Ефимов Роман Александрович',
          pet_type: 'Собака',
          pet_name: 'Оскар',
          service_price: 4800.0,
          created: '2024-12-18T11:55:10'
        },
        {
          id: 19,
          vet_full_name: 'Богданова Алина Константиновна',
          pet_type: 'Птица',
          pet_name: 'Чирик',
          service_price: 2700.0,
          created: '2024-12-19T14:35:00'
        },
        {
          id: 20,
          vet_full_name: 'Зайцев Виктор Васильевич',
          pet_type: 'Собака',
          pet_name: 'Зевс',
          service_price: 6500.0,
          created: '2024-12-20T09:30:50'
        }
      ],
      search: ''
    }
  },
  computed: {
    filteredData() {
      return this.search
        ? [...this.fakeData].filter(
            (item) =>
              item.vet_full_name
                .toLowerCase()
                .includes(this.search.toLowerCase()) ||
              item.pet_type.toLowerCase().includes(this.search.toLowerCase()) ||
              item.pet_name.toLowerCase().includes(this.search.toLowerCase())
          )
        : [...this.fakeData]
    }
  }
}
</script>

<template>
  <div class="orders-view">
    <DashboardControls
      title="Заказы"
      searchable
      addable
      @search="(val) => (search = val)"
      title-modal-add="Новая заявка"
    >
      <template #modal="{ close }">
        <OrderForm @close="close" />
      </template>
    </DashboardControls>
    <AppTable
      :rows="filteredData"
      :columns="tableHeaders"
      editable
      title-modal-edit="Редактирование заявки"
    >
      <template #modal="{ close }">
        <OrderForm @close="close" is-edit />
      </template>
    </AppTable>
  </div>
</template>
