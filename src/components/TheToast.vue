<script>
import success from '@/assets/img/success.gif'
import TransitionSlideFade from '@/components/TransitionSlideFade.vue'

export default {
  name: 'TheToast',
  components: { TransitionSlideFade },
  data() {
    return { success }
  },
  computed: {
    toast() {
      return this.$store.state.toast
    }
  }
}
</script>

<template>
  <TransitionSlideFade>
    <div class="toast" v-if="toast">
      <img :src="success" alt="Успех" />
      {{ toast }}
    </div>
  </TransitionSlideFade>
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

@media (max-width: 575.98px) {
  .toast {
    right: auto;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
