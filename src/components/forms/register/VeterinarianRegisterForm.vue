<script>
import { Form } from 'vee-validate'
import * as yup from 'yup'
import AppButton from '@/components/AppButton.vue'
import AppInput from '@/components/AppInput.vue'
import AppDatePicker from '@/components/AppDatePicker.vue'
import AppPassword from '@/components/AppPassword.vue'
import { EMAIL_MSG, PHONE_MSG, PHONE_REGEXP, REQUIRED_MSG } from '@/consts'
import AppSelect from '@/components/AppSelect.vue'

export default {
  name: 'ClientRegisterForm',
  components: {
    AppSelect,
    AppPassword,
    AppDatePicker,
    AppInput,
    AppButton,
    Form
  },
  data() {
    return {
      currentStep: 0,
      schemas: [
        yup.object({
          work_type: yup.string().required(REQUIRED_MSG),
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
            .required(REQUIRED_MSG)
        }),
        yup.object({
          city: yup.string().required(REQUIRED_MSG),
          address: yup.string().required(REQUIRED_MSG),
          passport_series: yup
            .string()
            .matches(/^\d{4}$/, 'Формат: 0001')
            .required('Обязательное поле'),
          passport_number: yup
            .string()
            .matches(/^\d{6}$/, 'Формат: 000001')
            .required('Обязательное поле')
        }),
        yup.object({
          education_name: yup.string().required(REQUIRED_MSG)
        }),
        yup.object({
          settlement_account: yup
            .string()
            .matches(/^\d{20}$/, 'Формат: 00000000000000000001')
            .required('Обязательное поле'),
          bank_name: yup.string().required(REQUIRED_MSG),
          bank_address: yup.string().required(REQUIRED_MSG),
          bank_correspondent_account: yup
            .string()
            .matches(/^\d{20}$/, 'Формат: 00000000000000000001')
            .required('Обязательное поле'),
          bik: yup
            .string()
            .matches(/^\d{8}$/, 'Формат: 00000001')
            .required(REQUIRED_MSG)
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
      ],
      workTypes: [
        {
          name: 'Самозанятый',
          id: 1
        },
        {
          name: 'ИП',
          id: 2
        }
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
      if (this.currentStep === 4) {
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
        <AppSelect
          label="Форма занятости"
          name="work_type"
          :items="workTypes"
          class="default-form-group"
          item-title="name"
          item-value="id"
        />
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
      </template>

      <template v-if="currentStep === 1">
        <AppInput
          label="Город фактического пребывания"
          name="city"
          class="default-form-group"
        />
        <AppInput label="Адрес" name="address" class="default-form-group" />
        <AppInput
          label="Серия паспорта"
          name="passport_series"
          class="default-form-group"
        />
        <AppInput
          label="Номер паспорта"
          name="passport_number"
          class="default-form-group"
        />
      </template>

      <template v-if="currentStep === 2">
        <AppInput
          label="Наименование учебного заведения"
          name="education_name"
          class="default-form-group"
        />
      </template>

      <template v-if="currentStep === 3">
        <AppInput
          label="Номер расчетного счета"
          name="settlement_account"
          class="default-form-group"
        />
        <AppInput
          label="Наименование учреждения банка"
          name="bank_name"
          class="default-form-group"
        />
        <AppInput
          label="Местонахождение банка"
          name="bank_address"
          class="default-form-group"
        />
        <AppInput
          label="Корреспондентский счет банка"
          name="bank_correspondent_account"
          class="default-form-group"
        />
        <AppInput label="БИК" name="bik" class="default-form-group" />
      </template>

      <template v-if="currentStep === 4">
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

        <AppButton v-if="currentStep !== 4" type="submit">Вперед</AppButton>
        <AppButton
          v-if="currentStep === 4"
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
