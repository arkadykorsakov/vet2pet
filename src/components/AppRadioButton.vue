<script>
import { useId } from 'vue'
import { useField } from 'vee-validate'

export default {
  name: 'AppRadioButton',
  props: {
    name: { type: String, required: true },
    label: { type: String, required: true },
    value: { type: String, required: true },
    disabled: { type: Boolean, default: false },
    modelValue: { type: String, default: undefined }
  },
  emits: ['update:modelValue'],
  setup(props) {
    const id = useId()
    const { value: radioValue, errorMessage } = useField(
      props.name,
      undefined,
      {
        checkedValue: props.value,
        type: 'radio'
      }
    )

    return {
      id,
      radioValue,
      errorMessage
    }
  }
}
</script>

<template>
  <div class="form__group">
    <input
      class="form__radio visually-hidden"
      type="radio"
      :id="id"
      :name="name"
      :value="value"
      :disabled="disabled"
      :checked="modelValue === value"
      v-model="radioValue"
    />
    <label
      :for="id"
      class="form__radio-label"
      :class="{ error: !!errorMessage }"
      >{{ label }}</label
    >
  </div>
</template>

<style scoped>
.form__radio-label {
  padding: 8px 12px;
  background: var(--opacity-008);
  -webkit-border-radius: var(--secondary-rounded);
  -moz-border-radius: var(--secondary-rounded);
  border-radius: var(--secondary-rounded);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
}

.form__radio:checked + .form__radio-label {
  background: var(--secondary-container);
  color: var(--on-primary);
}

.form__radio-label.error {
  background: var(--danger);
  color: var(--on-primary);
}
</style>
