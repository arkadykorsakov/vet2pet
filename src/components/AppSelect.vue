<script>
import { useId } from 'vue'
import { useField } from 'vee-validate'
import { onClickOutside } from '@vueuse/core'
import ErrorIcon from '@/icons/ErrorIcon.vue'
import ArrowIcon from '@/icons/ArrowIcon.vue'
import AppFormError from '@/components/AppFormError.vue'
import TransitionFadeIn from '@/components/TransitionFadeIn.vue'

export default {
  name: 'AppSelect',
  components: { TransitionFadeIn, ArrowIcon, ErrorIcon, AppFormError },
  props: {
    items: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      default: undefined
    },
    itemValue: {
      type: String,
      required: true
    },
    itemTitle: {
      type: String,
      required: true
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
  data() {
    return {
      isOpen: false,
      formGroupEl: null
    }
  },
  computed: {
    selectContent() {
      if (this.items.length) {
        const activeEl = this.items.find(
          (option) => option[this.itemValue] === this.selectValue
        )
        return activeEl ? activeEl[this.itemTitle] : ''
      }
      return ''
    }
  },
  setup(props) {
    const {
      value: selectValue,
      errorMessage,
      setErrors
    } = useField(props.name, undefined, {
      initialValue: props.value,
      syncVModel: true,
      validateOnValueUpdate: false
    })

    const id = useId()

    return {
      selectValue,
      errorMessage,
      setErrors,
      id
    }
  },
  mounted() {
    onClickOutside(this.$refs.formGroupEl, () => {
      this.isOpen = false
    })
  },
  watch: {
    selectValue() {
      this.isOpen = false
    }
  }
}
</script>

<template>
  <div class="default-form-group" ref="formGroupEl">
    <div class="default-field">
      <button
        type="button"
        class="select__content default-input"
        :class="{ filled: isOpen || !!selectValue, error: !!errorMessage }"
        @click="isOpen = !isOpen"
        :disabled="disabled"
      >
        {{ selectContent }}
      </button>
      <div class="default-label form__label" @click="isOpen = !isOpen">
        {{ label }}
      </div>
      <ArrowIcon class="select__arrow" :class="{ reverse: isOpen }" />
      <ErrorIcon v-if="errorMessage" class="default-error-icon" />
      <TransitionFadeIn>
        <div class="select-items" v-if="isOpen">
          <ul v-if="items?.length" class="select-items__list">
            <li
              v-for="(option, idx) in items"
              :key="option[itemValue]"
              class="select-option"
            >
              <input
                type="radio"
                :name="name"
                :value="option[itemValue]"
                :id="id + idx"
                @focus="setErrors(null)"
                class="select-option__radio"
                tabindex="-1"
                v-model="selectValue"
              />
              <label
                :for="id + idx"
                class="select-option__text"
                tabindex="0"
                @keydown.space="
                  ($event) => $event.target.previousSibling.click()
                "
              >
                {{ option[itemTitle] }}
              </label>
            </li>
          </ul>
        </div>
      </TransitionFadeIn>
    </div>
    <AppFormError v-if="errorMessage" :error-message="errorMessage" />
  </div>
</template>

<style scoped>
.form__label {
  cursor: pointer;
  text-align: left;
  max-width: 150px;
}

.select-items {
  -webkit-border-radius: var(--base-rounded);
  -moz-border-radius: var(--base-rounded);
  border-radius: var(--base-rounded);
  overflow: hidden;
  position: absolute;
  left: 0;
  top: calc(100% + 5px);
  z-index: 1;
  background: var(--on-primary);
  box-shadow: var(--elevation_1_shadow);
  width: 100%;
  color: var(--tertiary-container);
}

.select__arrow {
  position: absolute;
  right: 14px;
  top: 26px;
  transition: all 0.3s ease;
}

.select-option__text {
  text-align: left;
  word-wrap: break-word;
  word-break: break-all;
}

.select__content {
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}

.select-items__list {
  max-height: 180px;
  overflow-y: auto;
}

.select-items__list::-webkit-scrollbar {
  width: 5px;
}

.select-items__list::-webkit-scrollbar-track {
  background: var(--surface-bright);
}

.select-items__list::-webkit-scrollbar-thumb {
  background-color: var(--tertiary-container);
  border-radius: 4px;
}

.select-option__text {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: var(--base-rounded) 16px;
}

.select-option:first-child .select-option__text {
  padding: 16px 16px var(--base-rounded) 16px;
}

.select-option:last-child .select-option__text {
  padding: var(--base-rounded) 16px 16px 16px;
}

.select-option__radio {
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.select-option__text {
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
}

.select-option {
  position: relative;
}

.select-option__radio:checked + .select-option__text {
  background: var(--surface-bright);
  color: var(--surface-tint);
}

.select-option__radio:hover {
  cursor: pointer;
}

.select-option__radio:hover + .select-option__text,
.select-option__text:focus {
  outline: none;
  background-color: rgba(var(--primary-fixed-rgb), 0.2) !important;
}

.select__arrow.reverse {
  transform: rotate(180deg);
}

.default-input.error ~ .select__arrow {
  right: 40px;
}

:deep(.default-input.error ~ .select__arrow path) {
  stroke: var(--danger);
}

.select__content.error {
  color: var(--danger);
  padding: 16px 64px 16px 16px;
}
</style>
