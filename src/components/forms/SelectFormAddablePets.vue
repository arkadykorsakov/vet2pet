<script>
import AppRadioButton from '@/components/AppRadioButton.vue'
import { Form } from 'vee-validate'
import * as yup from 'yup'
import { REQUIRED_MSG } from '@/consts.js'
import { markRaw } from 'vue'
import ModalFormButtons from '@/components/ModalFormButtons.vue'

export default {
  name: 'SelectFormAddablePets',
  components: { ModalFormButtons, Form, AppRadioButton },
  emits: ['changeForm'],
  data() {
    const rules = {
      form: yup.string().required(REQUIRED_MSG)
    }
    const schema = markRaw(yup.object({ ...rules }))
    return {
      schema,
      forms: [
        {
          val: 'pets',
          label: 'Питомцы'
        },
        {
          val: 'pet-types',
          label: 'Виды животных'
        },
        {
          val: 'pet-breeds',
          label: 'Породы'
        },
        {
          val: 'detention-conditions',
          label: 'Условия содержания'
        },
        {
          val: 'place-conditions',
          label: 'Место содержания'
        },
        {
          val: 'food-brands',
          label: 'Бренды корма'
        },
        {
          val: 'pet-nutrition',
          label: 'Питание'
        },
        {
          val: 'pet-origins',
          label: 'Происхождение'
        }
      ]
    }
  },
  methods: {
    onSubmit(values) {
      this.$emit('changeForm', values.form)
    }
  }
}
</script>

<template>
  <Form
    :validation-schema="schema"
    v-slot="{ isSubmitting }"
    @submit="onSubmit"
    :initial-values="{ form: null }"
  >
    <div class="form__radios">
      <AppRadioButton
        v-for="form in forms"
        :value="form.val"
        :label="form.label"
        name="form"
        :key="form.val"
      />
    </div>
    <ModalFormButtons
      :disabled-submit="isSubmitting"
      label-action-btn="Далее"
    />
  </Form>
</template>

<style scoped>
.form__radios {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
}

@media (max-width: 767.98px) {
  .form__radios {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 490.98px) {
  .form__radios {
    grid-template-columns: 1fr;
  }
}
</style>
