<script>
import { Form } from 'vee-validate'
import AppPassword from '@/components/AppPassword.vue'
import AppButton from '@/components/AppButton.vue'
import * as yup from 'yup'
import { markRaw } from 'vue'
import { REQUIRED_MSG } from '@/consts.js'

export default {
  name: 'EditPasswordForm',
  components: { AppButton, AppPassword, Form },
  data() {
    const rules = {
      current_password: yup
        .string()
        .required(REQUIRED_MSG)
        .min(6, 'Минимум 6 символов'),
      password: yup
        .string()
        .required(REQUIRED_MSG)
        .min(6, 'Минимум 6 символов'),
      confirm_password: yup
        .string()
        .required(REQUIRED_MSG)
        .min(6, 'Минимум 6 символов')
        .oneOf([yup.ref('password')], 'Пароли не совпадают')
    }
    const schema = markRaw(yup.object({ ...rules }))
    return {
      form: null,
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
    async onSubmit(values, { resetForm }) {
      console.log(values)
      await new Promise((r) => setTimeout(r, 5000))
      if (values.current_password === '123456') {
        this.$store.dispatch('setToast', 'Пароль обновлен')
        resetForm()
      } else {
        this.$refs.form.setErrors({ current_password: 'Неверный пароль' })
      }
    }
  }
}
</script>

<template>
  <Form
    @submit="onSubmit"
    v-slot="{ isSubmitting }"
    :validation-schema="schema"
    ref="form"
  >
    <div class="form__body">
      <AppPassword label="Текущий пароль" name="current_password" />
      <AppPassword label="Новый пароль" name="password" />
      <AppPassword label="Повторите пароль" name="confirm_password" />
    </div>
    <div class="form__button">
      <AppButton type="submit" :disabled="isSubmitting">Сохранить</AppButton>
    </div>
  </Form>
</template>

<style scoped>
.form__button {
  display: flex;
  justify-content: flex-end;
}

.form__body {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
}
</style>
