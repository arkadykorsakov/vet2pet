<script>
import AppLoading from '@/components/AppLoading.vue'
import { Form } from 'vee-validate'
import AppTitle from '@/components/AppTitle.vue'
import AppInput from '@/components/AppInput.vue'
import AppPassword from '@/components/AppPassword.vue'
import AppDatePicker from '@/components/AppDatePicker.vue'
import AppSelect from '@/components/AppSelect.vue'
import * as yup from 'yup'
import { EMAIL_MSG, PHONE_MSG, PHONE_REGEXP, REQUIRED_MSG } from '@/consts.js'
import { markRaw } from 'vue'
import ModalFormButtons from '@/components/ModalFormButtons.vue'

export default {
  name: 'UserForm',
  components: {
    ModalFormButtons,
    AppSelect,
    AppDatePicker,
    AppInput,
    AppTitle,
    Form,
    AppLoading,
    AppPassword
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
      city: yup.string().required(REQUIRED_MSG),
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
    }
    if (this.isEdit) {
      rules['password'] = yup.string()
      rules['confirm_password'] = yup
        .string()
        .oneOf([yup.ref('password')], 'Пароли не совпадают')
    }
    const schema = markRaw(yup.object({ ...rules }))
    return {
      schema,
      isLoading: true,
      initialValues: {},
      roles: [
        { name: 'Клиент', id: 1 },
        { name: 'Администратор', id: 2 },
        { name: 'Ветеринар', id: 3 }
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
        this.isEdit ? 'Пользователь обновлен' : 'Пользователь зарегистрирован'
      )
    }
  },
  async mounted() {
    if (this.isEdit) {
      await new Promise((r) => setTimeout(r, 500))
      this.initialValues = {
        surname: 'Иванов',
        name: 'Иван',
        patronymic: 'Иванович',
        phone: '+79029752367',
        date_birth: '2003-04-05',
        city: 'Иванов',
        email: 'ivanov@mail.ru',
        role_id: 1,
        password: '',
        confirm_password: ''
      }
    }
    this.isLoading = false
  }
}
</script>

<template>
  <AppLoading v-if="isLoading" />
  <Form
    v-else
    @submit="onSubmit"
    :validation-schema="schema"
    v-slot="{ isSubmitting, meta }"
    :initial-values="initialValues"
  >
    <div class="form__start">
      <AppTitle class="form__subtitle">Основные параметры</AppTitle>
      <div class="form__body">
        <AppInput label="Фамилия" name="surname" />
        <AppInput label="Имя" name="name" />
        <AppInput label="Отчество" name="patronymic" />
        <AppInput label="Город фактического пребывания" name="city" />
        <AppInput label="Телефон" name="phone" />
        <AppDatePicker label="Дата Рождения" name="date_birth" />
      </div>
    </div>
    <div class="form__end">
      <AppTitle class="form__subtitle">Данные для входа</AppTitle>
      <div class="form__body">
        <AppInput label="Email" name="email" type="email" />
        <AppSelect
          item-title="name"
          item-value="id"
          label="Роль"
          name="role_id"
          :items="roles"
        />
        <AppPassword name="password" label="Пароль" class="cols-2" />
        <AppPassword
          name="confirm_password"
          label="Повторите Пароль"
          class="cols-2"
        />
      </div>
    </div>
    <ModalFormButtons :disabled-submit="isSubmitting || !meta.valid" />
  </Form>
</template>

<style scoped>
.form__start {
  margin-bottom: 40px;
}

.form__subtitle {
  margin-bottom: 32px;
}

.form__start .form__body {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.form__end .form__body {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.cols-2 {
  grid-column: span 2;
}

@media (max-width: 575.98px) {
  .form__start .form__body,
  .form__end .form__body {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
}
</style>
