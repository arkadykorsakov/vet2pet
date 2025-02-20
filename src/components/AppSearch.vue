<script>
import { useId } from 'vue'
import { useField } from 'vee-validate'
import SearchIcon from '@/icons/SearchIcon.vue'

export default {
  name: 'AppSearch',
  components: { SearchIcon },
  data() {
    return {
      searchEl: null
    }
  },
  props: {
    name: {
      type: String,
      default: 'search'
    },
    value: {
      type: String,
      default: undefined
    },
    modelValue: {
      type: String,
      default: undefined
    }
  },
  setup(props) {
    const { value: inputValue, errorMessage } = useField(
      props.name,
      undefined,
      {
        initialValue: props.value,
        syncVModel: true,
        validateOnValueUpdate: false
      }
    )

    const id = useId()

    return {
      inputValue,
      errorMessage,
      id
    }
  }
}
</script>

<template>
  <div class="form__field">
    <SearchIcon class="form__icon" @click="$refs.searchEl.focus()" />
    <input
      type="search"
      :id="id"
      class="form__input"
      :class="{ filled: !!inputValue }"
      placeholder="Поиск"
      :name="name"
      @focus="setErrors"
      ref="searchEl"
      v-model.trim="inputValue"
    />
    <label class="visually-hidden" :for="id">Поиск</label>
  </div>
</template>

<style scoped>
.form__field {
  height: 56px;
  position: relative;
  max-width: 300px;
}

.form__input {
  background: var(--on-primary);
  -webkit-border-radius: var(--secondary-rounded);
  -moz-border-radius: var(--secondary-rounded);
  border-radius: var(--secondary-rounded);
  line-height: 1.5;
  font-size: 16px;
  color: var(--secondary);
  font-weight: 500;
  transition: all 0.3s ease;
  width: 153px;
  padding: 16px 16px 16px 58px;
}

.form__input::placeholder {
  color: var(--surface-variant);
  font-weight: 500;
  line-height: 1.5;
  font-size: 16px;
}

.form__icon {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 16px;
  cursor: pointer;
}

.form__input:focus,
.form__input.filled {
  outline: none;
  box-shadow: var(--elevation_1_shadow);
  max-width: 300px;
  width: 100%;
}

.form__input::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
}

.form__input:focus::-webkit-search-cancel-button,
.form__input.filled::-webkit-search-cancel-button {
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  height: 20px;
  width: 20px;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3e%3cpath d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z' stroke='%23DAE5E4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M15 9L9 15' stroke='%23DAE5E4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3e%3cpath d='M9 9L15 15' stroke='%23DAE5E4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e");
  background-size: 20px 20px;
}

@media (max-width: 991.98px) {
  .form__input {
    width: 100%;
    max-width: 300px;
    border: 1px solid var(--primary-fixed);
  }
}
</style>
