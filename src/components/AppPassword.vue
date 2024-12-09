<script>
import { useId } from 'vue'
import { useField } from 'vee-validate'
import EyeIcon from '@/icons/EyeIcon.vue'
import ErrorIcon from '@/icons/ErrorIcon.vue'
import ClosedEyeIcon from '@/icons/ClosedEyeIcon.vue'
import AppFormError from "@/components/AppFormError.vue";

export default {
  name: 'AppPassword',
  components: { ClosedEyeIcon, EyeIcon, ErrorIcon, AppFormError },
  data() {
    return {
      id: useId(),
      isShowPassword: false
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
    value: {
      type: String,
      default: undefined
    }
  },
  setup(props) {
    const {
      value: modelValue,
      errorMessage,
      handleBlur,
      handleChange
    } = useField(props.name, undefined, {
      initialValue: props.value
    })
    return {
      modelValue,
      errorMessage,
      handleBlur,
      handleChange
    }
  }
}
</script>

<template>
  <div class="form__group">
    <div class="default-field">
      <input
        class="default-input form__input"
        :class="{ error: !!errorMessage, filled: !!modelValue }"
        :type="isShowPassword ? 'text' : 'password'"
        :id="id"
        :name="name"
        :value="modelValue"
        @input="handleChange"
        @blur="handleBlur"
      />
      <label class="default-label" :for="id">{{ label }}</label>
      <ErrorIcon v-if="errorMessage" class="default-error-icon" />
      <component
        :is="isShowPassword ? 'ClosedEyeIcon' : 'EyeIcon'"
        class="form__eye"
        @click="() => (isShowPassword = !isShowPassword)"
      />
    </div>
    <AppFormError v-if="errorMessage" :error-message="errorMessage" />
  </div>
</template>

<style scoped>
.form__eye {
  position: absolute;
  right: 12px;
  top: 18px;
  cursor: pointer;
}
.form__input.error {
  padding: 16px 64px 16px 16px;
}
.form__input.error ~ .form__eye {
  right: 40px;
}

:deep(.form__input.error ~ .form__eye path) {
  fill: var(--danger);
}
</style>
