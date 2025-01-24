<script>
import ModalFormButtons from '@/components/ModalFormButtons.vue'
import { Form } from 'vee-validate'
import AppUploadImage from '@/components/AppUploadImage.vue'
import { markRaw } from 'vue'
import * as yup from 'yup'
import { REQUIRED_MSG } from '@/consts.js'
import AppInput from '@/components/AppInput.vue'
import AppLoading from '@/components/AppLoading.vue'

export default {
  name: 'PetTypeForm',
  components: { AppLoading, AppInput, AppUploadImage, ModalFormButtons, Form },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const schema = markRaw(
      yup.object({
        name: yup.string().required(REQUIRED_MSG),
        file: yup
          .mixed()
          .required(REQUIRED_MSG)
          .test('fileSize', 'Не больше 5МБ', (file) => {
            return file && file.size <= 5 * 1024 * 1024 // Ограничение: 5MB
          })
          .test('fileType', 'Только картинки', (file) => {
            return file && ['image/jpeg', 'image/png'].includes(file.type)
          })
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
        this.isEdit ? 'Вид животных обновлен' : 'Вид животных создан'
      )
    }
  },
  mounted() {
    if (this.isEdit) {
      this.initialData = {
        name: 'Собака',
        file: 'https://images.unsplash.com/photo-1505845664900-f883fde76fb0?w=1000&h=563&fit=crop'
      }
    }
    this.isLoading = false
  }
}
</script>

<template>
  <AppLoading v-if="isLoading" />
  <Form
    v-slot="{ isSubmitting }"
    @submit="onSubmit"
    :validation-schema="schema"
    :initial-values="initialData"
    v-else
  >
    <div class="form__row">
      <AppInput label="Название" name="name" />
    </div>
    <div class="form__row">
      <AppUploadImage label="Иконка" name="file" />
    </div>
    <ModalFormButtons
      :disabled-submit="isSubmitting"
      @cancel="isEdit ? $emit('close') : $emit('cancel')"
      :label-cancel-btn="isEdit ? 'Отмена' : 'Назад'"
    />
  </Form>
</template>
