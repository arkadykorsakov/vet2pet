<script>
import { useId } from 'vue'
import { useField } from 'vee-validate'
import { onClickOutside } from '@vueuse/core'
import ErrorIcon from '@/icons/ErrorIcon.vue'
import ArrowIcon from '@/icons/ArrowIcon.vue'
import AppFormError from '@/components/AppFormError.vue'

export default {
  name: 'AppSelect',
  components: { ArrowIcon, ErrorIcon, AppFormError },
  props: {
    options: {
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
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      id: useId(),
      isOpen: false,
      formGroupEl: null
    }
  },
  computed: {
    selectContent() {
      return (
        this.options.find((option) => option.val === this.modelValue)?.label ||
        ''
      )
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
  },
  mounted() {
    onClickOutside(this.$refs.formGroupEl, () => {
      this.isOpen = false
    })
  }
}
</script>

<template>
  <div class="form__group" ref="formGroupEl">
    <div class="default-field">
      <button
        type="button"
        class="select__content default-input"
        :class="{ filled: isOpen || !!modelValue, error: !!errorMessage }"
        @click="isOpen = !isOpen"
      >
        {{ selectContent }}
      </button>
      <div class="default-label form__label" @click="isOpen = !isOpen">
        {{ label }}
      </div>
      <ArrowIcon class="select__arrow" :class="{ reverse: isOpen }" />
      <ErrorIcon v-if="errorMessage" class="default-error-icon" />
      <BaseTransition>
        <div class="select-options" v-if="isOpen">
          <ul v-if="options?.length" class="select-options__list">
            <li
              v-for="(option, idx) in options"
              :key="option.val"
              class="select-option"
            >
              <input
                type="radio"
                :name="name"
                :value="option.val"
                :id="id + idx"
                @change="
                  (val) => {
                    isOpen = false
                    handleChange(val)
                  }
                "
                class="select-option__radio"
                tabindex="-1"
              />
              <label
                :for="id + idx"
                class="select-option__text"
                tabindex="0"
                @keydown.space="
                  ($event) => $event.target.previousSibling.click()
                "
              >
                {{ option.label }}
              </label>
            </li>
          </ul>
        </div>
      </BaseTransition>
    </div>
    <AppFormError v-if="errorMessage" :error-message="errorMessage" />
  </div>
</template>

<style scoped>
.form__label {
  cursor: pointer;
}

.select-options {
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

.select__content,
.select-option__text {
  text-align: left;
  word-wrap: break-word;
  word-break: break-all;
}

.select__content {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  position: relative;
}

.select-options__list {
  max-height: 180px;
  overflow-y: auto;
}

.select-options__list::-webkit-scrollbar {
  width: 5px;
}

.select-options__list::-webkit-scrollbar-track {
  background: var(--surface-bright);
}

.select-options__list::-webkit-scrollbar-thumb {
  background-color: var(--tertiary-container);
  border-radius: 4px;
}

.select-option__text {
  display: block;
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
