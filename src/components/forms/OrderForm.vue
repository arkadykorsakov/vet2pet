<script>
import { Form } from 'vee-validate'
import ModalFormButtons from '@/components/ModalFormButtons.vue'
import * as yup from 'yup'
import { REQUIRED_MSG } from '@/consts.js'
import AppSelect from '@/components/AppSelect.vue'
import AppTextarea from '@/components/AppTextarea.vue'
import AppDatePicker from '@/components/AppDatePicker.vue'
import { markRaw } from 'vue'
import AppLoading from '@/components/AppLoading.vue'

export default {
  name: 'OrderForm',
  components: {
    AppLoading,
    AppDatePicker,
    AppTextarea,
    AppSelect,
    ModalFormButtons,
    Form
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  data() {
    const rules = {
      pet_id: yup.string().required(REQUIRED_MSG),
      vet_service_id: yup.string().required(REQUIRED_MSG),
      symptoms: yup.string().required(REQUIRED_MSG),
      comment: yup.string().required(REQUIRED_MSG),
      date_symptoms: yup
        .date()
        .typeError('Невалидная дата')
        .required(REQUIRED_MSG),
      vet_consultation_type_id: yup.string().required(REQUIRED_MSG),
      vet_id: yup.string().required(REQUIRED_MSG),
      term: yup.date().typeError('Невалидная дата').required(REQUIRED_MSG)
    }
    if (this.isEdit) {
      rules['commentChat'] = yup.string().required(REQUIRED_MSG)
    }
    const schema = markRaw(yup.object({ ...rules }))
    return {
      schema,
      isLoading: true,
      initialValues: {
        pet_id: undefined,
        vet_service_id: undefined,
        symptoms: undefined,
        comment: undefined,
        commentChat: undefined,
        term: undefined,
        date_symptoms: undefined,
        vet_consultation_type_id: undefined,
        vet_id: undefined
      },
      pets: [
        { id: 1, name: 'Барсик' },
        { id: 2, name: 'Мурка' },
        { id: 3, name: 'Тузик' },
        { id: 4, name: 'Рекс' },
        { id: 5, name: 'Белка' }
      ],
      vetServices: [
        { id: 1, name: 'Общая консультация' },
        { id: 2, name: 'Прививка' },
        { id: 3, name: 'Хирургия' },
        { id: 4, name: 'Диагностика' },
        { id: 5, name: 'Стерилизация' }
      ],
      consultationTypes: [
        { id: 1, name: 'Первичная консультация' },
        { id: 2, name: 'Повторный осмотр' },
        { id: 3, name: 'Онлайн-консультация' },
        { id: 4, name: 'Эмердженси' },
        { id: 5, name: 'Рекомендации после лечения' }
      ],
      responsibleVets: [
        { id: 1, fullName: 'Иванов Иван Иванович' },
        { id: 2, fullName: 'Петрова Ольга Сергеевна' },
        { id: 3, fullName: 'Сидоров Виктор Петрович' },
        { id: 4, fullName: 'Кузнецова Мария Владимировна' },
        { id: 5, fullName: 'Фёдоров Александр Николаевич' }
      ]
    }
  },
  methods: {
    async onSubmit(values, { resetForm }) {
      await new Promise((r) => setTimeout(r, 5000))
      console.log(values)
      resetForm()
      this.$emit('close')
      this.$store.dispatch(
        'setToast',
        this.isEdit ? 'Заказ обновлен' : 'Заказ создан'
      )
    }
  },
  async mounted() {
    if (this.isEdit) {
      await new Promise((r) => setTimeout(r, 500))
      this.initialValues = {
        pet_id: 1,
        vet_service_id: 3,
        symptoms: 'Кашель, усталость',
        comment: 'Питомец стал вялым после прогулки.',
        commentChat: 'Обсудить возможность онлайн-консультации.',
        term: '2024-12-15',
        date_symptoms: '2024-12-15',
        vet_consultation_type_id: 2,
        vet_id: 5
      }
    }
    this.isLoading = false
  }
}
</script>

<template>
  <AppLoading v-if="isLoading" />
  <Form
    @submit="onSubmit"
    :validation-schema="schema"
    v-slot="{ isSubmitting }"
    :initial-values="initialValues"
    v-else
  >
    <div class="form__body">
      <AppSelect
        label="Питомец"
        name="pet_id"
        :items="pets"
        item-title="name"
        item-value="id"
        class="form__group"
      />
      <AppSelect
        label="Оказываемая услуга"
        name="vet_service_id"
        :items="vetServices"
        item-title="name"
        item-value="id"
        class="form__group"
      />

      <AppSelect
        label="Тип консультации"
        name="vet_consultation_type_id"
        :items="consultationTypes"
        item-title="name"
        item-value="id"
      />
      <AppDatePicker label="Дата симптомов" name="date_symptoms" />
      <AppTextarea label="Комментарий" name="comment" class="cols-2" />
      <AppTextarea label="Описание симптомов" name="symptoms" class="cols-2" />
      <AppTextarea
        label="Комментарий ChatGPT"
        name="commentChat"
        class="cols-2"
        v-if="isEdit"
      />
      <AppSelect
        label="Ответственный ветеринар"
        name="vet_id"
        :items="responsibleVets"
        item-title="fullName"
        item-value="id"
      />
      <AppDatePicker name="term" label="Срок заявки" />
    </div>
    <ModalFormButtons
      :disabled-submit="isSubmitting"
      @cancel="$emit('close')"
    />
  </Form>
</template>

<style scoped>
.form__body {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.cols-2 {
  grid-column: span 2;
}

@media (max-width: 575.98px) {
  .form__body {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
}
</style>
