<script>
export default {
  name: 'AppFormError',
  props: {
    errorMessage: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="form__error-message">
    {{ errorMessage }}
  </div>
</template>

<style scoped>
.form__error-message {
  font-size: 12px;
  color: var(--danger);
  margin-top: 2px;
}
</style>
