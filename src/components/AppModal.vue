<script>
import AppTitle from '@/components/AppTitle.vue'
import XSecondIcon from '@/icons/XSecondIcon.vue'
import TransitionFadeIn from '@/components/TransitionFadeIn.vue'
import ModalFormButtons from '@/components/ModalFormButtons.vue'
import useFocusTrap from '@/composables/useFocusTrap'

export default {
  name: 'AppModal',
  components: { ModalFormButtons, TransitionFadeIn, XSecondIcon, AppTitle },
  props: {
    title: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close'],
  watch: {
    show() {
      if (this.show) {
        this.lockBodyScroll()
      } else {
        this.unlockBodyScroll()
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    closeOnEscape(e) {
      if (e.key === 'Escape' && this.show) {
        this.close()
      }
    },
    getScrollbarWidth() {
      return window.innerWidth - document.documentElement.clientWidth
    },
    lockBodyScroll() {
      const scrollbarWidth = this.getScrollbarWidth()
      document.body.style.paddingRight = `${scrollbarWidth}px`
      document.body.style.overflow = 'hidden'
    },
    unlockBodyScroll() {
      document.body.style.paddingRight = ''
      document.body.style.overflow = ''
    }
  },
  mounted() {
    document.addEventListener('keydown', this.closeOnEscape)
  },
  unmounted() {
    document.removeEventListener('keydown', this.closeOnEscape)
    document.body.style.overflow = null
  },
  setup() {
    const { trapRef } = useFocusTrap()
    return {
      trapRef
    }
  }
}
</script>

<template>
  <TransitionFadeIn>
    <div class="modal" v-if="show" @click.self="close">
      <div class="modal__card" ref="trapRef">
        <button class="modal__close" type="button" @click="close">
          <XSecondIcon />
        </button>
        <div class="modal__header">
          <AppTitle tag="h2">{{ title }}</AppTitle>
        </div>
        <div class="modal__body">
          <slot />
        </div>
      </div>
    </div>
  </TransitionFadeIn>
</template>

<style>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  padding: 20px;
  overflow: auto;
}

.modal__header {
  padding-right: 30px;
  margin-bottom: 56px;
}

.modal__close {
  position: absolute;
  width: 26px;
  height: 26px;
  top: 38px;
  right: 32px;
}

.modal__close svg {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.modal__card {
  position: relative;
  max-width: 800px;
  width: 100%;
  background: var(--on-primary);
  padding: 32px;
  -webkit-border-radius: var(--secondary-rounded);
  -moz-border-radius: var(--secondary-rounded);
  border-radius: var(--secondary-rounded);
}

@media (max-width: 767.98px) {
  .modal__card {
    padding: 24px;
  }
  .modal__close {
    top: 28px;
    right: 24px;
  }
  .modal__header {
    margin-bottom: 26px;
  }
}
</style>
