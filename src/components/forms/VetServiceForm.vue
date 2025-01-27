<script>
import AppLoading from '@/components/AppLoading.vue'
import ModalFormButtons from '@/components/ModalFormButtons.vue'
import * as yup from 'yup'
import { REQUIRED_MSG } from '@/consts.js'
import { markRaw } from 'vue'
import { Form } from 'vee-validate'
import AppInput from '@/components/AppInput.vue'
import AppSelect from '@/components/AppSelect.vue'

export default {
  name: 'VetServiceForm',
  components: { AppSelect, AppInput, ModalFormButtons, AppLoading, Form },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  data() {
    const rules = {
      name: yup.string().required(REQUIRED_MSG),
      price: yup.number().typeError('Невалидное число').required(REQUIRED_MSG),
      specialization_id: yup.string().required(REQUIRED_MSG)
    }
    const schema = markRaw(yup.object({ ...rules }))
    return {
      isLoading: true,
      initialValues: {},
      schema,
      specializations: [
        { id: 1, name: 'Ветеринар-паразитолог' },
        { id: 2, name: 'Ветеринар-диетолог' },
        { id: 3, name: 'Ветеринар-реаниматолог' },
        { id: 4, name: 'Ветеринар-уролог' },
        { id: 5, name: 'Ветеринар-эксперт' }
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
        this.isEdit
          ? 'Ветеринарная услуга обновлена'
          : 'Ветеринарная услуга создана'
      )
    }
  },
  async mounted() {
    if (this.isEdit) {
      await new Promise((r) => setTimeout(r, 500))
      this.initialValues = {
        name: 'Вакцинация домашних животных',
        specialization_id: 1,
        price: 1200
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
    v-slot="{ isSubmitting, meta }"
    :initial-values="initialValues"
    v-else
  >
    <div class="form__body">
      <AppInput label="Наименование" name="name" class="cols-2" />
      <AppInput label="Стоимость" name="price" type="number" :step="0.01" />
      <AppSelect
        item-title="name"
        item-value="id"
        label="Подходящая специализация"
        name="specialization_id"
        :items="specializations"
      />
    </div>
    <ModalFormButtons
      :disabled-submit="isSubmitting || !meta.valid"
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
