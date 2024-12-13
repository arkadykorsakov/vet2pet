<script>
import AppDivider from "@/components/AppDivider.vue";
import AppButton from "@/components/AppButton.vue";

export default {
  name: "ModalFormButtons",
  components: {AppButton, AppDivider},
  props: {
    labelActionBtn: {
      type: String,
      default: "Сохранить",
    },
    disabledSubmit: {
      type: Boolean,
      required: true
    }
  },
  emits: ['cancel']
}
</script>

<template>
  <div class="form-down">
    <AppDivider class="form-down__divider"/>
    <div class="form-down__buttons">
      <AppButton color="white" @click="$emit('cancel')">Отмена</AppButton>
      <AppButton type="submit" :disabled="disabledSubmit">{{ labelActionBtn }}</AppButton>
    </div>
  </div>
</template>

<style scoped>
.form-down {
  margin-top: 64px;
}

.form-down__divider {
  margin-bottom: 64px;
}

.form-down__buttons {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
</style>