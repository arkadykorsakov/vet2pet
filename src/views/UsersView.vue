<script>
import DashboardControls from '@/components/DashboardControls.vue'
import AppTable from '@/components/AppTable.vue'
import UserForm from '@/components/forms/UserForm.vue'

export default {
  name: 'UsersView',
  components: { UserForm, AppTable, DashboardControls },
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
        { label: 'Логин', field: 'email', sortable: true, align: 'left' },
        { label: 'ФИО', field: 'fullName', sortable: true, align: 'left' },
        { label: 'Роль', field: 'role', sortable: true, align: 'left' },
        {
          label: 'День рождения',
          field: 'birthday',
          sortable: true,
          align: 'left',
          format: 'date'
        },
        {
          label: 'Зарегистрирован',
          field: 'created',
          sortable: true,
          align: 'left',
          format: 'datetime'
        }
      ],
      fakeData: [
        {
          id: 1,
          email: 'ivan.petrov@example.com',
          fullName: 'Петров Иван Сергеевич',
          role: 'Ветеринар',
          birthday: '1990-02-15',
          created: '2024-06-01'
        },
        {
          id: 2,
          email: 'anna.ivanova@example.com',
          fullName: 'Иванова Анна Владимировна',
          role: 'Клиент',
          birthday: '1985-10-03',
          created: '2024-06-02'
        },
        {
          id: 3,
          email: 'pavel.sidorov@example.com',
          fullName: 'Сидоров Павел Андреевич',
          role: 'Ветеринар',
          birthday: '1992-08-21',
          created: '2024-06-03'
        },
        {
          id: 4,
          email: 'olga.kuznetsova@example.com',
          fullName: 'Кузнецова Ольга Николаевна',
          role: 'Клиент',
          birthday: '1995-05-12',
          created: '2024-06-04'
        },
        {
          id: 5,
          email: 'alexey.volkov@example.com',
          fullName: 'Волков Алексей Юрьевич',
          role: 'Ветеринар',
          birthday: '1988-11-30',
          created: '2024-06-05'
        },
        {
          id: 6,
          email: 'elena.smolina@example.com',
          fullName: 'Смолина Елена Александровна',
          role: 'Клиент',
          birthday: '1999-01-24',
          created: '2024-06-06'
        },
        {
          id: 7,
          email: 'sergey.koltsov@example.com',
          fullName: 'Кольцов Сергей Викторович',
          role: 'Ветеринар',
          birthday: '1987-07-19',
          created: '2024-06-07'
        },
        {
          id: 8,
          email: 'natalia.belova@example.com',
          fullName: 'Белова Наталья Ивановна',
          role: 'Клиент',
          birthday: '1994-12-14',
          created: '2024-06-08'
        },
        {
          id: 9,
          email: 'dmitry.orlov@example.com',
          fullName: 'Орлов Дмитрий Петрович',
          role: 'Ветеринар',
          birthday: '1991-03-18',
          created: '2024-06-09'
        },
        {
          id: 10,
          email: 'tatyana.lebedeva@example.com',
          fullName: 'Лебедева Татьяна Сергеевна',
          role: 'Клиент',
          birthday: '1996-09-25',
          created: '2024-06-10'
        },
        {
          id: 11,
          email: 'vladimir.rybakov@example.com',
          fullName: 'Рыбаков Владимир Олегович',
          role: 'Ветеринар',
          birthday: '1983-04-02',
          created: '2024-06-11'
        },
        {
          id: 12,
          email: 'irina.efimova@example.com',
          fullName: 'Ефимова Ирина Павловна',
          role: 'Клиент',
          birthday: '2000-02-28',
          created: '2024-06-12'
        },
        {
          id: 13,
          email: 'andrey.zaitsev@example.com',
          fullName: 'Зайцев Андрей Владимирович',
          role: 'Ветеринар',
          birthday: '1989-06-15',
          created: '2024-06-13'
        },
        {
          id: 14,
          email: 'marina.kolesnikova@example.com',
          fullName: 'Колесникова Марина Алексеевна',
          role: 'Клиент',
          birthday: '1998-08-03',
          created: '2024-06-14'
        },
        {
          id: 15,
          email: 'roman.shishkin@example.com',
          fullName: 'Шишкин Роман Васильевич',
          role: 'Ветеринар',
          birthday: '1993-12-22',
          created: '2024-06-15'
        },
        {
          id: 16,
          email: 'svetlana.polyakova@example.com',
          fullName: 'Полякова Светлана Геннадьевна',
          role: 'Клиент',
          birthday: '2001-04-17',
          created: '2024-06-16'
        },
        {
          id: 17,
          email: 'egor.kotov@example.com',
          fullName: 'Котов Егор Иванович',
          role: 'Ветеринар',
          birthday: '1985-07-08',
          created: '2024-06-17'
        },
        {
          id: 18,
          email: 'victoria.zhukova@example.com',
          fullName: 'Жукова Виктория Сергеевна',
          role: 'Клиент',
          birthday: '1997-11-11',
          created: '2024-06-18'
        },
        {
          id: 19,
          email: 'nikita.kozlov@example.com',
          fullName: 'Козлов Никита Алексеевич',
          role: 'Ветеринар',
          birthday: '1990-05-20',
          created: '2024-06-19'
        },
        {
          id: 20,
          email: 'alisa.tikhonova@example.com',
          fullName: 'Тихонова Алиса Игоревна',
          role: 'Клиент',
          birthday: '1999-03-05',
          created: '2024-06-20'
        }
      ]
    }
  },
  computed: {
    filteredData() {
      return this.search
        ? [...this.fakeData].filter((item) =>
            item.fullName.toLowerCase().includes(this.search.toLowerCase())
          )
        : [...this.fakeData]
    }
  }
}
</script>

<template>
  <div class="users-view">
    <DashboardControls
      title="Пользователи"
      addable
      searchable
      add-button-label="Зарегистрировать +"
      title-modal-add="Регистрация пользователя"
      @search="(val) => (search = val)"
    >
      <template #modal="{ close }">
        <UserForm @close="close" />
      </template>
    </DashboardControls>
    <AppTable
      :rows="fakeData"
      :columns="tableHeaders"
      editable
      title-modal-edit="Редактирование пользователя"
    >
      <template #modal="{ close }">
        <UserForm @close="close" is-edit />
      </template>
    </AppTable>
  </div>
</template>
