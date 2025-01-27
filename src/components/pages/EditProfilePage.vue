<script>
import AppEditButton from '@/components/AppEditButton.vue'
import { Form } from 'vee-validate'
import AppInput from '@/components/AppInput.vue'
import AppDatePicker from '@/components/AppDatePicker.vue'
import AppModal from '@/components/AppModal.vue'
import EditContactsForm from '@/components/forms/EditContactsForm.vue'

export default {
  name: 'EditProfilePage',
  components: {
    EditContactsForm,
    AppModal,
    AppDatePicker,
    AppInput,
    Form,
    AppEditButton
  },
  data() {
    return {
      fakeData: {
        id: 1,
        surname: 'Козлов',
        name: 'Никита',
        patronymic: 'Алексеевич',
        date_birth: '1990-05-20',
        city: 'Абакан',
        phone: '+79029752367'
      },
      show: false
    }
  }
}
</script>

<template>
  <Form :initial-values="fakeData">
    <div class="form__body">
      <AppInput label="Фамилия" name="surname" disabled />
      <AppInput label="Имя" name="name" disabled />
      <AppInput label="Отчество" name="patronymic" disabled />
      <AppInput label="Город" name="city" disabled />
      <AppInput label="Номер" name="phone" disabled />
      <AppDatePicker label="Дата рождения" name="date_birth" disabled />
    </div>
    <div class="form__button">
      <AppEditButton @click="show = true" />
    </div>
    <Teleport to="body">
      <AppModal
        title="Редактирование контактной информации"
        :show="show"
        @close="show = false"
      >
        <EditContactsForm @close="show = false" />
      </AppModal>
    </Teleport>
  </Form>
</template>

<style scoped>
.form__button {
  display: flex;
  justify-content: flex-end;
}
.form__body {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 24px;
}

@media (max-width: 575.98px) {
  .form__body {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
}
</style>
