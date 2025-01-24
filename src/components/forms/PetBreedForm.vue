<script>
import ModalFormButtons from '@/components/ModalFormButtons.vue'
import { Form } from 'vee-validate'
import { markRaw } from 'vue'
import * as yup from 'yup'
import { REQUIRED_MSG } from '@/consts.js'
import AppInput from '@/components/AppInput.vue'
import AppLoading from '@/components/AppLoading.vue'

export default {
  name: 'PetBreedForm',
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
      isLoading: true,
      initialData: {}
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
        this.isEdit ? 'Порода обновлена' : 'Порода создана'
      )
    }
  },
  mounted() {
    if (this.isEdit) {
      this.initialData = {
        name: 'Лабрадор Ретривер'
      }
    }
    this.isLoading = false
  }
}
</script>

<template>
  <AppLoading v-if="isLoading" />
  <Form
    v-slot="{ isSubmitting, values }"
    @submit="onSubmit"
    :validation-schema="schema"
    :initial-values="initialData"
    v-else
  >
    <div class="form__row">
      <AppInput label="Название" name="name" />
    </div>
    <ModalFormButtons
      :disabled-submit="isSubmitting"
      @cancel="isEdit ? $emit('close') : $emit('cancel')"
      :label-cancel-btn="isEdit ? 'Отмена' : 'Назад'"
    />
  </Form>
</template>
