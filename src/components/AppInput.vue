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
          class="default-input"
          :class="{ error: !!errorMessage, filled: !!modelValue }"
          :type="type"
          :id="id"
          :name="name"
          :value="modelValue"
          @input="handleChange"
          @change="handleChange"
          @blur="handleBlur"
          :min="min"
          :max="max"
      />
      <label class="default-label" :for="id">{{ label }}</label>
      <ErrorIcon v-if="errorMessage" class="default-error-icon"/>
    </div>
    <AppFormError v-if="errorMessage" :error-message="errorMessage"/>
  </div>
</template>
