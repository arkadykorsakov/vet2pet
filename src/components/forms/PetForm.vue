<script>
import ModalFormButtons from '@/components/ModalFormButtons.vue'
import { Form } from 'vee-validate'
import AppMultipleUploadImage from '@/components/AppMultipleUploadImage.vue'
import AppSelect from '@/components/AppSelect.vue'
import AppInput from '@/components/AppInput.vue'
import AppDatePicker from '@/components/AppDatePicker.vue'
import { markRaw } from 'vue'
import * as yup from 'yup'
import { REQUIRED_MSG } from '@/consts.js'
import AppLoading from '@/components/AppLoading.vue'

export default {
  name: 'PetForm',
  components: {
    AppLoading,
    AppDatePicker,
    AppInput,
    AppSelect,
    AppMultipleUploadImage,
    ModalFormButtons,
    Form
  },
  emits: ['cancel', 'close'],
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const schema = markRaw(
      yup.object({
        gender: yup.string().required(REQUIRED_MSG),
        pet_type: yup.string().required(REQUIRED_MSG),
        pet_breed: yup.string().required(REQUIRED_MSG),
        pet_origin: yup.string().required(REQUIRED_MSG),
        weight: yup.number().required(REQUIRED_MSG).min(0.001),
        stylization: yup.string().required(REQUIRED_MSG),
        place_conditions: yup.string().required(REQUIRED_MSG),
        detention_condition: yup.string().required(REQUIRED_MSG),
        pet_nutrition: yup.string().required(REQUIRED_MSG),
        food_brand: yup.string().required(REQUIRED_MSG),
        chip: yup.string().required(REQUIRED_MSG),
        date_birth: yup.date().required(REQUIRED_MSG),
        photos: yup
          .array()
          .typeError('Массив фото')
          .required(REQUIRED_MSG)
          .of(
            yup
              .mixed()
              .test(
                'fileSize',
                'Размер файла должен быть меньше 2 МБ',
                (file) => (file ? file.size <= 2 * 1024 * 1024 : true)
              )
          )
          .min(1, 'Вы должны выбрать хотя бы один файл')
      })
    )
    return {
      schema,
      isLoading: true,
      petTypes: [
        {
          id: 1,
          name: 'Собака'
        },
        {
          id: 2,
          name: 'Кошка'
        }
      ],
      petBreeds: [
        {
          id: 1,
          name: 'Лабрадор Ретривер'
        },
        {
          id: 2,
          name: 'Персидская кошка'
        }
      ],
      genders: [
        {
          id: 1,
          name: 'Женский'
        },
        {
          id: 2,
          name: 'Мужской'
        }
      ],
      petOrigins: [
        {
          id: 1,
          name: 'Домашнее разведение'
        },
        {
          id: 2,
          name: 'Питомник'
        }
      ],
      placeConditions: [
        {
          id: 1,
          name: 'Дом'
        },
        {
          id: 2,
          name: 'Квартира'
        }
      ],
      petNutrition: [
        {
          id: 1,
          name: 'Сухой корм'
        },
        {
          id: 2,
          name: 'Влажный корм'
        }
      ],
      detentionConditions: [
        {
          id: 1,
          name: 'Квартира'
        },
        {
          id: 2,
          name: 'Частный дом с участком'
        }
      ],
      foodBrands: [
        {
          id: 1,
          name: 'Royal Canin'
        },
        {
          id: 2,
          name: 'Purina Pro Plan'
        }
      ],
      initialData: {}
    }
  },
  methods: {
    onSubmit(values, { resetForm }) {
      console.log(values)
      resetForm()
      this.$emit('close')
      this.$store.dispatch(
        'setToast',
        this.isEdit ? 'Питомец обновлен' : 'Питомец создан'
      )
    }
  },
  async mounted() {
    if (this.isEdit) {
      this.initialData = {
        gender: 1,
        pet_type: 1,
        pet_breed: 1,
        pet_origin: 1,
        weight: 1200,
        stylization: 'Да',
        pet_nutrition: 1,
        food_brand: 1,
        chip: 12034,
        date_birth: '2012-02-12',
        place_conditions: 1,
        detention_condition: 1,
        created: '2012-02-12T00:00:00',
        photos: [
          'https://images.unsplash.com/photo-1505845664900-f883fde76fb0?w=1000&h=563&fit=crop',
          'https://images.unsplash.com/photo-1483168527879-c66136b56105?w=1000&h=563&fit=crop',
          'https://images.unsplash.com/photo-1499678329028-101435549a4e?w=1000&h=563&fit=crop',
          'https://images.unsplash.com/photo-1483899528283-bc33678e9153?w=1000&h=563&fit=crop',
          'https://images.unsplash.com/photo-1484795819573-86ae049cb815?w=1000&h=563&fit=crop',
          'https://images.unsplash.com/photo-1475064042787-0209411c7765?w=1000&h=563&fit=crop',
          'https://images.unsplash.com/photo-1533408874882-397bf377a8c2?w=1000&h=563&fit=crop',
          'https://images.unsplash.com/photo-1652323854427-2b55c904c6a1?w=1000&h=563&fit=crop',
          'https://images.unsplash.com/photo-1473679408190-0693dd22fe6a?w=1000&h=563&fit=crop',
          'https://images.unsplash.com/photo-1681136268712-d409d55ced6c?w=1000&h=563&fit=crop'
        ]
      }
    }
    this.isLoading = false
  }
}
</script>

<template>
  <AppLoading v-if="isLoading" />
  <Form
    v-slot="{ isSubmitting }"
    @submit="onSubmit"
    :validation-schema="schema"
    :initial-values="initialData"
    v-else
  >
    <div class="form__body">
      <AppSelect
        item-title="name"
        item-value="id"
        label="Пол"
        name="gender"
        :items="genders"
        class="cols-2"
      />
      <AppSelect
        item-title="name"
        item-value="id"
        label="Вид"
        name="pet_type"
        :items="petTypes"
        class="cols-2"
      />
      <AppSelect
        item-title="name"
        item-value="id"
        label="Порода"
        name="pet_breed"
        :items="petBreeds"
        class="cols-2"
      />
      <AppSelect
        item-title="name"
        item-value="id"
        label="Происхождение"
        name="pet_origin"
        :items="petOrigins"
        class="cols-2"
      />
      <AppInput
        label="Вес"
        name="weight"
        type="number"
        :step="0.001"
        class="cols-2"
      />
      <AppSelect
        item-title="name"
        item-value="value"
        label="Стерилизация"
        name="stylization"
        :items="[
          { name: 'Да', value: 'Да' },
          { name: 'Нет', value: 'Нет' }
        ]"
        class="cols-2"
      />
      <AppSelect
        item-title="name"
        item-value="id"
        label="Место содержания"
        name="place_conditions"
        :items="placeConditions"
        class="cols-3"
      />
      <AppSelect
        item-title="name"
        item-value="id"
        label="Условия содержания"
        name="detention_condition"
        :items="detentionConditions"
        class="cols-3"
      />
      <AppSelect
        item-title="name"
        item-value="id"
        label="Питание"
        name="pet_nutrition"
        :items="petNutrition"
        class="cols-3"
      />
      <AppSelect
        item-title="name"
        item-value="id"
        label="Бренд корма"
        name="food_brand"
        :items="foodBrands"
        class="cols-3"
      />
      <AppInput label="Номер чипа" name="chip" class="cols-3" />
      <AppDatePicker label="Дата рождения" name="date_birth" class="cols-3" />
    </div>
    <AppMultipleUploadImage label="Фото питомца" name="photos" />
    <ModalFormButtons
      :disabled-submit="isSubmitting"
      @cancel="isEdit ? $emit('close') : $emit('cancel')"
      :label-cancel-btn="isEdit ? 'Отмена' : 'Назад'"
    />
  </Form>
</template>

<style scoped>
.form__body {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 24px;
  margin-bottom: 24px;
}

.cols-2 {
  grid-column: span 2;
}

.cols-3 {
  grid-column: span 3;
}

@media (max-width: 575.98px) {
  .form__body {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
}
</style>
