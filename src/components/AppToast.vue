<script>
import success from '@/assets/img/success.gif'

export default {
  name: 'AppToast',
  data() {
    return { success }
  },
  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="toast">
    <img :src="success" alt="Успех" />
    {{ message }}
  </div>
</template>

<style scoped>
.toast {
  background: var(--inverse-primary);
  position: fixed;
  z-index: 35;
  right: 80px;
  bottom: 80px;
  padding: 32px;
  border-radius: var(--secondary-rounded);
  box-shadow: var(--elevation_1_shadow);
  color: var(--on-primary-2);
  display: flex;
  align-items: center;
  gap: 12px;
}

.toast img {
  width: 40px;
  height: 40px;
}
</style>
