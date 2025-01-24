<script>
import { useId } from 'vue'
import { useField } from 'vee-validate'
import ErrorIcon from '@/icons/ErrorIcon.vue'
import AppFormError from '@/components/AppFormError.vue'

export default {
  name: 'AppInput',
  components: { ErrorIcon, AppFormError },
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: undefined
    },
    type: {
      type: String,
      default: 'text',
      validator: (value) => ['text', 'email', 'number'].includes(value)
    },
    max: {
      type: Number,
      default: undefined
    },
    min: {
      type: Number,
      default: undefined
    },
    step: {
      type: Number,
      default: undefined
    },
    modelValue: {
      type: String,
      default: undefined
    },
    disabled: { type: Boolean, default: false }
  },
  setup(props) {
    const {
      value: inputValue,
      errorMessage,
      setErrors
    } = useField(props.name, undefined, {
      initialValue: props.value,
      syncVModel: true,
      validateOnValueUpdate: false
    })

    const id = useId()

    return {
      inputValue,
      errorMessage,
      setErrors,
      id
    }
  }
}
</script>

<template>
  <div class="default-form-group">
    <div class="default-field">
      <input
        class="default-input"
        :class="{ error: !!errorMessage, filled: !!inputValue }"
        :type="type"
        :id="id"
        :name="name"
        @focus="setErrors(null)"
        :min="min"
        :max="max"
        :disabled="disabled"
        :step="step"
        v-model="inputValue"
      />
      <label class="default-label" :for="id">{{ label }}</label>
      <ErrorIcon v-if="errorMessage" class="default-error-icon" />
    </div>
    <AppFormError v-if="errorMessage" :error-message="errorMessage" />
  </div>
</template>
