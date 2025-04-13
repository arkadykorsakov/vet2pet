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

    function handleChange(event) {
      if (props.type === 'number' && event.target.value) {
        if (props.type === 'number' && event.target.value !== undefined) {
          event.target.value = event.target.value.replace(',', '.')

          event.target.value = event.target.value.replace(
            /(?<!^)-|[^0-9.-]|(?!^)-|(?<=\.\d*)\.|^\.-|^-\.$/g,
            ''
          )

          event.target.value = event.target.value.replace(/^(-?)0+(?=\d)/, '$1')

          if (event.target.value.startsWith('.'))
            event.target.value = '0' + event.target.value

          if (event.target.value === '' || event.target.value === '-.')
            event.target.value = ''
        }
      }
      inputValue.value = event.target.value
    }

    function handleBlur(event) {
      if (props.type === 'number' && event.target.value) {
        if (event.target.value === '-') event.target.value = ''
        inputValue.value = Number(event.target.value)
      }
    }

    return {
      inputValue,
      errorMessage,
      setErrors,
      id,
      handleChange,
      handleBlur
    }
  }
}
</script>

<template>
  <div class="default-form-group">
    <div class="default-field">
      <input
        class="default-input"
        :class="{
          error: !!errorMessage,
          filled: !!inputValue?.toString()
        }"
        :type="type === 'number' ? 'text' : type"
        :id="id"
        :name="name"
        @focus="setErrors(null)"
        :disabled="disabled"
        :value="inputValue"
        @input="handleChange"
        @blur="handleBlur"
      />
      <label class="default-label" :for="id">{{ label }}</label>
      <ErrorIcon v-if="errorMessage" class="default-error-icon" />
    </div>
    <AppFormError v-if="errorMessage" :error-message="errorMessage" />
  </div>
</template>
