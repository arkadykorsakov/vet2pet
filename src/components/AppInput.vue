<script>
import {useId} from 'vue'
import {useField} from 'vee-validate'
import ErrorIcon from "@/icons/ErrorIcon.vue";
import AppFormError from "@/components/AppFormError.vue";

export default {
  name: 'AppInput',
  components: {ErrorIcon, AppFormError},
  data() {
    return {
      id: useId()
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
    modelValue: {
      type: String,
      default: undefined
    },
    disabled: {type: Boolean, default: false},
  },
  setup(props) {
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange
    } = useField(props.name, undefined, {
      initialValue: props.value,
      syncVModel: true
    })

    return {
      inputValue,
      errorMessage,
      handleBlur,
      handleChange
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
          :value="inputValue"
          @input="handleChange"
          @change="handleChange"
          @blur="handleBlur"
          :min="min"
          :max="max"
          :disabled="disabled"
      />
      <label class="default-label" :for="id">{{ label }}</label>
      <ErrorIcon v-if="errorMessage" class="default-error-icon"/>
    </div>
    <AppFormError v-if="errorMessage" :error-message="errorMessage"/>
  </div>
</template>
