<script>
import { useId } from 'vue'
import { useField } from 'vee-validate'
import ErrorIcon from '@/icons/ErrorIcon.vue'
import AppFormError from '@/components/AppFormError.vue'

export default {
  name: 'AppTextarea',
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
    modelValue: {
      type: String,
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const {
      value: inputValue,
      errorMessage,
      setErrors
    } = useField(props.name, undefined, {
      initialValue: props.value,
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
      <textarea
        class="default-input"
        :class="{ error: !!errorMessage, filled: !!inputValue }"
        :id="id"
        :name="name"
        @focus="setErrors(null)"
        v-model="inputValue"
        :disabled="disabled"
      >
      </textarea>
      <label class="default-label" :for="id">{{ label }}</label>
      <ErrorIcon v-if="errorMessage" class="default-error-icon" />
    </div>
    <AppFormError v-if="errorMessage" :error-message="errorMessage" />
  </div>
</template>

<style scoped>
textarea.default-input {
  height: auto;
  resize: vertical;
}

.default-label {
  top: 16px;
  transform: translateY(0);
}
</style>
