<script>
import { useId } from 'vue'
import { useField } from 'vee-validate'
import ErrorIcon from '@/icons/ErrorIcon.vue'
import AppFormError from '@/components/AppFormError.vue'

export default {
  name: 'AppDatePicker',
  components: { ErrorIcon, AppFormError },
  data() {
    return {
      datePickerEl: null
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    errorMessage: {
      type: String,
      required: false
    },
    value: {
      type: String,
      default: undefined
    },
    isShowTime: {
      type: Boolean,
      required: false
    },
    minDate: {
      type: String,
      default: '1970-01-01'
    },
    maxDate: {
      type: String,
      default: '9999-12-31'
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
    <div class="form__field">
      <input
        class="default-input form__input"
        ref="datePickerEl"
        :type="isShowTime ? 'datetime-local' : 'date'"
        :max="isShowTime ? `${maxDate}T23:59:59` : `${maxDate}`"
        :min="isShowTime ? `${minDate}T00:00:00` : `${minDate}`"
        :class="{ error: !!errorMessage, filled: !!inputValue }"
        :id="id"
        :name="name"
        v-model="inputValue"
        :disabled="disabled"
        @focus="setErrors(null)"
      />
      <label
        class="form__label default-label"
        :for="id"
        @click="() => this.$refs.datePickerEl.focus()"
        >{{ label }}</label
      >
      <ErrorIcon v-if="errorMessage" class="default-error-icon" />
    </div>
    <AppFormError v-if="errorMessage" :error-message="errorMessage" />
  </div>
</template>

<style scoped>
.form__field {
  position: relative;
}

.form__input::-webkit-calendar-picker-indicator {
  background-size: contain;
  width: 24px;
  height: 24px;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z' stroke='%2330445F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M16 2V6' stroke='%2330445F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M8 2V6' stroke='%2330445F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M3 10H21' stroke='%2330445F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e ");
}

.form__input {
  padding: 12px 16px;
  color: transparent;
  cursor: text;
}

.form__input:disabled {
  color: transparent;
}

.form__input.error {
  padding: 12px 40px 16px 12px;
}

.form__input:focus,
.form__input.filled {
  color: var(--surface-tint);
}

.form__input.error:focus,
.form__input.error.filled {
  color: var(--danger);
}

.form__input.error::-webkit-calendar-picker-indicator {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3e%3cpath d='M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z' stroke='%23BA1A1A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M16 2V6' stroke='%23BA1A1A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M8 2V6' stroke='%23BA1A1A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M3 10H21' stroke='%23BA1A1A' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e");
}
</style>
