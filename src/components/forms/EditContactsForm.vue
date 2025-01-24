<script>
import { Form } from 'vee-validate'
import ModalFormButtons from '@/components/ModalFormButtons.vue'
import AppInput from '@/components/AppInput.vue'
import AppDatePicker from '@/components/AppDatePicker.vue'
import * as yup from 'yup'
import { markRaw } from 'vue'
import { PHONE_MSG, PHONE_REGEXP, REQUIRED_MSG } from '@/consts.js'

export default {
  name: 'EditContactsForm',
  components: { AppDatePicker, AppInput, ModalFormButtons, Form },
  emits: ['close'],
  data() {
    const rules = {
      surname: yup.string().required(REQUIRED_MSG),
      name: yup.string().required(REQUIRED_MSG),
      patronymic: yup.string().required(REQUIRED_MSG),
      phone: yup
        .string()
        .required(REQUIRED_MSG)
        .matches(PHONE_REGEXP, PHONE_MSG),
      date_birth: yup
        .date()
        .typeError('Невалидная дата')
        .required(REQUIRED_MSG),
      city: yup.string().required(REQUIRED_MSG)
    }
    const schema = markRaw(yup.object({ ...rules }))
    return {
      fakeData: {
        id: 1,
        surname: 'Козлов',
        name: 'Никита',
        patronymic: 'Алексеевич',
        date_birth: '1990-05-20',
        city: 'Абакан',
        phone: '+79029752367'
      },
      schema
    }
  },
  methods: {
    async onSubmit(values) {
      console.log(values)
      await new Promise((r) => setTimeout(r, 5000))
      this.$emit('close')
      this.$store.dispatch('setToast', 'Контактные данные обновлены')
    }
  }
}
</script>

<template>
  <Form
    v-slot="{ isSubmitting }"
    :initial-values="fakeData"
    @submit="onSubmit"
    :validation-schema="schema"
  >
    <div class="form__row form__row_cols-3">
      <AppInput label="Фамилия" name="surname" />
      <AppInput label="Имя" name="name" />
      <AppInput label="Отчество" name="patronymic" />
    </div>
    <div class="form__row form__row_cols-3">
      <AppInput label="Город" name="city" />
      <AppInput label="Номер" name="phone" />
      <AppDatePicker label="Дата рождения" name="date_birth" />
    </div>
    <ModalFormButtons :disabled-submit="isSubmitting" @close="$emit('close')" />
  </Form>
</template>
