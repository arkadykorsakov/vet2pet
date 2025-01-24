<script>
import DashboardControls from '@/components/DashboardControls.vue'
import AppTable from '@/components/AppTable.vue'

export default {
  name: 'ReviewsView',
  components: { AppTable, DashboardControls },
  data() {
    return {
      tableHeaders: [
        {
          label: 'Номер',
          field: 'id',
          sortable: true,
          align: 'left',
          style: 'width: 100px'
        },
        { label: 'Оценка', field: 'stars', sortable: true, align: 'left' },
        { label: 'Клиент', field: 'client', sortable: true, align: 'left' },
        { label: 'Ветеринар', field: 'vet', sortable: true, align: 'left' },
        {
          label: 'Комментарий',
          field: 'comment',
          sortable: true,
          align: 'left'
        },
        {
          label: 'Дата',
          field: 'created',
          sortable: true,
          align: 'left',
          format: 'datetime'
        }
      ],
      fakeData: [
        {
          id: 1,
          stars: 5,
          client: 'Иванов Иван Сергеевич',
          vet: 'Смирнов Алексей Петрович',
          comment: 'Отличный сервис, рекомендую!',
          created: '2024-12-01'
        },
        {
          id: 2,
          stars: 4,
          client: 'Петрова Ольга Дмитриевна',
          vet: 'Сидоров Михаил Викторович',
          comment: 'Все хорошо, но пришлось немного подождать.',
          created: '2024-12-02'
        },
        {
          id: 3,
          stars: 3,
          client: 'Кузнецов Алексей Иванович',
          vet: 'Иванова Мария Сергеевна',
          comment: 'Среднее качество обслуживания.',
          created: '2024-12-03'
        },
        {
          id: 4,
          stars: 5,
          client: 'Сергеева Мария Алексеевна',
          vet: 'Волков Дмитрий Олегович',
          comment: 'Профессиональный подход, спасибо!',
          created: '2024-12-04'
        },
        {
          id: 5,
          stars: 2,
          client: 'Новиков Сергей Владимирович',
          vet: 'Попов Владимир Николаевич',
          comment: 'Не очень понравилось отношение к клиенту.',
          created: '2024-12-05'
        },
        {
          id: 6,
          stars: 4,
          client: 'Васильева Татьяна Андреевна',
          vet: 'Захарова Екатерина Юрьевна',
          comment: 'Все отлично, кроме высокой стоимости.',
          created: '2024-12-06'
        },
        {
          id: 7,
          stars: 1,
          client: 'Фролов Дмитрий Александрович',
          vet: 'Белов Артем Евгеньевич',
          comment: 'Очень плохой опыт, не рекомендую.',
          created: '2024-12-07'
        },
        {
          id: 8,
          stars: 5,
          client: 'Орлова Екатерина Николаевна',
          vet: 'Антонова Наталья Сергеевна',
          comment: 'Лучший ветеринар, которого я встречала!',
          created: '2024-12-08'
        },
        {
          id: 9,
          stars: 3,
          client: 'Крылов Николай Васильевич',
          vet: 'Романов Андрей Павлович',
          comment: 'Обычное обслуживание, ничего особенного.',
          created: '2024-12-09'
        },
        {
          id: 10,
          stars: 4,
          client: 'Королева Анна Михайловна',
          vet: 'Григорьев Максим Вячеславович',
          comment: 'Хороший сервис, но могли бы быть внимательнее.',
          created: '2024-12-10'
        },
        {
          id: 11,
          stars: 5,
          client: 'Михайлов Константин Романович',
          vet: 'Тихонов Виталий Аркадьевич',
          comment: 'Замечательный специалист, все четко и по делу.',
          created: '2024-12-11'
        },
        {
          id: 12,
          stars: 4,
          client: 'Федорова Елена Юрьевна',
          vet: 'Мартынов Алексей Игоревич',
          comment: 'Все прошло хорошо, животное здорово.',
          created: '2024-12-12'
        },
        {
          id: 13,
          stars: 3,
          client: 'Григорьев Михаил Артемович',
          vet: 'Савельева Анна Владимировна',
          comment: 'Могли бы уделить больше внимания.',
          created: '2024-12-13'
        },
        {
          id: 14,
          stars: 2,
          client: 'Евдокимова Наталья Александровна',
          vet: 'Гончаров Павел Сергеевич',
          comment: 'К сожалению, ожидания не оправдались.',
          created: '2024-12-14'
        },
        {
          id: 15,
          stars: 5,
          client: 'Лазарев Олег Дмитриевич',
          vet: 'Семенова Елизавета Николаевна',
          comment: 'Отличное обслуживание, буду обращаться снова!',
          created: '2024-12-15'
        },
        {
          id: 16,
          stars: 1,
          client: 'Богданова Светлана Константиновна',
          vet: 'Дмитриев Артем Алексеевич',
          comment: 'Животному стало хуже после приема.',
          created: '2024-12-16'
        },
        {
          id: 17,
          stars: 4,
          client: 'Рябов Андрей Михайлович',
          vet: 'Козлова Юлия Андреевна',
          comment: 'Все нормально, но могли быть внимательнее.',
          created: '2024-12-17'
        },
        {
          id: 18,
          stars: 5,
          client: 'Куликова Анастасия Павловна',
          vet: 'Шестаков Виктор Иванович',
          comment: 'Животное быстро выздоровело, спасибо доктору.',
          created: '2024-12-18'
        },
        {
          id: 19,
          stars: 2,
          client: 'Соболев Василий Петрович',
          vet: 'Ефимова Маргарита Георгиевна',
          comment: 'Не понравилось отношение к клиентам.',
          created: '2024-12-19'
        },
        {
          id: 20,
          stars: 5,
          client: 'Павлова Кристина Сергеевна',
          vet: 'Зуев Александр Дмитриевич',
          comment: 'Доктор от Бога, всем рекомендую!',
          created: '2024-12-20'
        }
      ],
      search: ''
    }
  },
  computed: {
    filteredData() {
      return this.search
        ? [...this.fakeData].filter((item) =>
            item.vet.toLowerCase().includes(this.search.toLowerCase())
          )
        : [...this.fakeData]
    }
  }
}
</script>

<template>
  <div class="reviews-view">
    <DashboardControls
      title="Отзывы"
      searchable
      @search="(val) => (search = val)"
    />
    <AppTable :columns="tableHeaders" :rows="filteredData" />
  </div>
</template>

<style scoped></style>
