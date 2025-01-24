<script>
import { Form } from 'vee-validate'
import AppInput from '@/components/AppInput.vue'
import AppPassword from '@/components/AppPassword.vue'
import AppButton from '@/components/AppButton.vue'
import * as yup from 'yup'
import { EMAIL_MSG, REQUIRED_MSG } from '@/consts.js'
import { markRaw } from 'vue'

export default {
  name: 'LoginForm',
  components: { AppButton, AppPassword, AppInput, Form },
  data() {
    const schema = markRaw(
      yup.object({
        email: yup.string().required(REQUIRED_MSG).email(EMAIL_MSG),
        password: yup
          .string()
          .required(REQUIRED_MSG)
          .min(6, 'Минимум 6 символов')
      })
    )
    return {
      schema
    }
  },
  methods: {
    submit(values) {
      console.log(values)
      this.$router.push('/')
    }
  }
}
</script>

<template>
  <Form
    @submit="submit"
    :validation-schema="schema"
    keep-values
    v-slot="{ isSubmitting }"
  >
    <div>
      <AppInput
        label="Email"
        name="email"
        type="email"
        class="default-form-group"
      />
      <AppPassword label="Пароль" name="password" class="default-form-group" />
    </div>
    <div class="form__buttons">
      <AppButton type="submit" :disabled="isSubmitting"> Войти</AppButton>
      <AppButton color="transparent"> Забыли пароль?</AppButton>
    </div>
  </Form>
</template>

<style scoped>
.form__buttons {
  margin-top: 24px;
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  align-items: center;
}

:deep(.form__buttons button) {
  flex: 0 0 calc(50% - 20px);
}
</style>
