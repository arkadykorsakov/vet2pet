<script>
import { Form } from 'vee-validate'
import * as yup from 'yup'
import AppButton from '@/components/AppButton.vue'
import AppInput from '@/components/AppInput.vue'
import AppDatePicker from '@/components/AppDatePicker.vue'
import AppPassword from '@/components/AppPassword.vue'
import { EMAIL_MSG, PHONE_MSG, PHONE_REGEXP, REQUIRED_MSG } from '@/consts'

export default {
  name: 'ClientRegisterForm',
  components: { AppPassword, AppDatePicker, AppInput, AppButton, Form },
  data() {
    return {
      currentStep: 0,
      schemas: [
        yup.object({
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
        }),
        yup.object({
          email: yup.string().required(REQUIRED_MSG).email(EMAIL_MSG),
          password: yup
            .string()
            .required(REQUIRED_MSG)
            .min(6, 'Минимум 6 символов'),
          confirm_password: yup
            .string()
            .required(REQUIRED_MSG)
            .min(6, 'Минимум 6 символов')
            .oneOf([yup.ref('password')], 'Пароли не совпадают')
        })
      ]
    }
  },
  computed: {
    currentSchema() {
      return this.schemas[this.currentStep]
    }
  },
  methods: {
    nextStep(values) {
      if (this.currentStep === 1) {
        console.log(values)
        this.$router.push('/login')
        return
      }
      this.currentStep++
    },
    prevStep() {
      if (this.currentStep <= 0) {
        return
      }
      this.currentStep--
    }
  }
}
</script>

<template>
  <div>
    <Form
      @submit="nextStep"
      :validation-schema="currentSchema"
      keep-values
      v-slot="{ isSubmitting }"
      class="register-form"
    >
      <template v-if="currentStep === 0">
        <AppInput label="Фамилия" name="surname" class="default-form-group" />
        <AppInput label="Имя" name="name" class="default-form-group" />
        <AppInput
          label="Отчество"
          name="patronymic"
          class="default-form-group"
        />
        <AppDatePicker
          label="Дата рождения"
          name="date_birth"
          class="default-form-group"
        />
        <AppInput label="Телефон" name="phone" class="default-form-group" />
        <AppInput label="Город" name="city" class="default-form-group" />
      </template>

      <template v-if="currentStep === 1">
        <AppInput
          label="Email"
          name="email"
          type="email"
          class="default-form-group"
        />
        <AppPassword
          label="Пароль"
          name="password"
          class="default-form-group"
        />
        <AppPassword
          label="Повторите пароль"
          name="confirm_password"
          class="default-form-group"
        />
      </template>

      <div class="form__buttons">
        <AppButton
          :disabled="currentStep === 0"
          type="button"
          @click="prevStep"
          color="transparent"
        >
          Назад
        </AppButton>

        <AppButton v-if="currentStep !== 1" type="submit">Вперед</AppButton>
        <AppButton
          v-if="currentStep === 1"
          type="submit"
          :disabled="isSubmitting"
          >Регистрация
        </AppButton>
      </div>
    </Form>
  </div>
</template>

<style scoped>
.register-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.form__buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
}
</style>
