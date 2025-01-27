<script>
import ModalFormButtons from '@/components/ModalFormButtons.vue'
import { Form } from 'vee-validate'
import { markRaw } from 'vue'
import * as yup from 'yup'
import { REQUIRED_MSG } from '@/consts.js'
import AppInput from '@/components/AppInput.vue'
import AppLoading from '@/components/AppLoading.vue'

export default {
  name: 'PetNutritionForm',
  components: { AppLoading, AppInput, ModalFormButtons, Form },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const schema = markRaw(
      yup.object({
        name: yup.string().required(REQUIRED_MSG)
      })
    )
    return {
      schema,
      initialData: {},
      isLoading: true
    }
  },
  emits: ['cancel', 'close'],
  methods: {
    onSubmit(values, { resetForm }) {
      console.log(values)
      resetForm()
      this.$emit('close')
      this.$store.dispatch(
        'setToast',
        this.isEdit ? 'Питание обновлено' : 'Питание создано'
      )
    }
  },
  async mounted() {
    if (this.isEdit) {
      this.initialData = {
        name: 'Специальные добавки'
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
    v-slot="{ isSubmitting }"
    @submit="onSubmit"
    :validation-schema="schema"
    :initial-values="initialData"
  >
    <AppInput label="Название" name="name" />
    <ModalFormButtons
      :disabled-submit="isSubmitting"
      @cancel="isEdit ? $emit('close') : $emit('cancel')"
      :label-cancel-btn="isEdit ? 'Отмена' : 'Назад'"
    />
  </Form>
</template>
