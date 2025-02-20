<script>
import AppBreadCrumbs from '@/components/AppBreadCrumbs.vue'
import AppSlider from '@/components/PetsSlider.vue'
import { Form } from 'vee-validate'
import AppInput from '@/components/AppInput.vue'
import AppSelect from '@/components/AppSelect.vue'
import AppDatePicker from '@/components/AppDatePicker.vue'
import AppEditButton from '@/components/AppEditButton.vue'
import AppModal from '@/components/AppModal.vue'
import PetForm from '@/components/forms/PetForm.vue'

export default {
  name: 'PetView',
  components: {
    PetForm,
    AppModal,
    AppEditButton,
    AppDatePicker,
    AppSelect,
    AppInput,
    AppSlider,
    AppBreadCrumbs,
    Form
  },
  data() {
    return {
      show: false,
      initialData: {
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
        created: '2012-02-12T00:00:00'
      },
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
      imageIds: [
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
}
</script>

<template>
  <div class="pet-view">
    <AppBreadCrumbs
      :bread-crumbs="[
        { label: 'Питомцы', link: '/pets' },
        { label: 'Хвостатый', link: '/pets/1' }
      ]"
      class="pet-view__breadcrumbs"
    />
    <div class="pet-view__data">
      <Form :initial-values="initialData" class="pet-view__content">
        <div class="form__body">
          <AppSelect
            class="cols-2"
            item-title="name"
            item-value="id"
            label="Пол"
            name="gender"
            :items="genders"
            disabled
          />
          <AppSelect
            class="cols-2"
            item-title="name"
            item-value="id"
            label="Вид"
            name="pet_type"
            :items="petTypes"
            disabled
          />
          <AppSelect
            class="cols-2"
            item-title="name"
            item-value="id"
            label="Порода"
            name="pet_breed"
            :items="petBreeds"
            disabled
          />
          <AppSelect
            class="cols-2"
            item-title="name"
            item-value="id"
            label="Происхождение"
            name="pet_origin"
            :items="petOrigins"
            disabled
          />
          <AppInput
            class="cols-2"
            label="Вес"
            name="weight"
            type="number"
            disabled
          />
          <AppSelect
            class="cols-2"
            item-title="name"
            item-value="value"
            label="Стерилизация"
            name="stylization"
            :items="[
              { name: 'Да', value: 'Да' },
              { name: 'Нет', value: 'Нет' }
            ]"
            disabled
          />
          <AppSelect
            class="cols-3"
            item-title="name"
            item-value="id"
            label="Место содержания"
            name="place_conditions"
            :items="placeConditions"
            disabled
          />
          <AppSelect
            class="cols-3"
            item-title="name"
            item-value="id"
            label="Условия содержания"
            name="detention_condition"
            :items="detentionConditions"
            disabled
          />
          <AppSelect
            class="cols-3"
            item-title="name"
            item-value="id"
            label="Питание"
            name="pet_nutrition"
            :items="petNutrition"
            disabled
          />
          <AppSelect
            class="cols-3"
            item-title="name"
            item-value="id"
            label="Бренд корма"
            name="food_brand"
            :items="foodBrands"
            disabled
          />
          <AppInput label="Номер чипа" name="chip" disabled class="cols-3" />
          <AppDatePicker
            label="Дата рождения"
            name="date_birth"
            disabled
            class="cols-3"
          />
        </div>
        <div class="pet-view__edit">
          <AppDatePicker
            class="pet-view__created"
            label="Зарегистрирован"
            name="created"
            disabled
            is-show-time
          />
          <AppEditButton @click="show = true" />
        </div>
        <Teleport to="body">
          <AppModal
            title="Редактирование питомца"
            :show="show"
            @close="show = false"
          >
            <PetForm @close="show = false" is-edit />
          </AppModal>
        </Teleport>
      </Form>
      <AppSlider :images="imageIds" />
    </div>
  </div>
</template>

<style scoped>
.pet-view__breadcrumbs {
  margin-bottom: 46px;
}

.pet-view__content {
  width: 100%;
}

.pet-view__data {
  display: flex;
  width: 100%;
  gap: 16px;
}

.pet-view__edit {
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.pet-view__created {
  max-width: 200px;
}

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

@media (max-width: 1200px) {
  .pet-view__data {
    flex-wrap: wrap;
  }
}
@media (max-width: 575.98px) {
  .form__body {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
}
</style>
