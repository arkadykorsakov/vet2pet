<script>
export default {
  name: 'AppButton',
  props: {
    type: {
      type: String,
      required: false,
      default: 'button',
      validator: (value) => ['button', 'submit', 'reset'].includes(value)
    },
    color: {
      type: String,
      required: false,
      default: 'green',
      validator: (value) => ['green', 'white', 'transparent'].includes(value)
    },
    disabled: {
      type: Boolean,
      required: false
    }
  }
}
</script>

<template>
  <button :type="type" class="btn" :class="[color]" :disabled="disabled">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  padding: 16px;
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
  border-radius: 100px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.5s ease;
  border: 2px solid transparent;
  letter-spacing: 1px;
  line-height: 1.4;
  min-width: 91px;
}
.btn.transparent {
  color: var(--primary);
}
.btn.green {
  background-color: var(--primary-fixed);
  color: var(--on-primary);
}
.btn.green:hover {
  background-color: var(--primary-fixed-hover);
}
.btn.green:active {
  background-color: var(--primary-fixed-active);
}
.btn.white {
  background-color: var(--on-primary);
  color: var(--surface-tint);
  border-color: var(--primary-fixed);
}
.btn.white:hover,
.btn.transparent:hover {
  background-color: rgba(var(--primary-fixed-rgb), 0.1);
}
.btn.white:active,
.btn.transparent:active {
  background-color: rgba(var(--primary-fixed-rgb), 0.2);
}
.btn:disabled {
  background-color: rgba(29, 27, 32, 0.12) !important;
  color: var(--on-surface) !important;
  cursor: not-allowed !important;
}
</style>
