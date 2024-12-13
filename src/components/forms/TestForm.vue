<script>
import AppInput from "@/components/AppInput.vue";
import ModalFormButtons from "@/components/ModalFormButtons.vue";
import {Form} from "vee-validate";
import * as yup from "yup";
import {EMAIL_MSG, REQUIRED_MSG} from "@/consts.js";

export default {
  name: "TestForm",
  components: {Form, ModalFormButtons, AppInput},
  data() {
    return {
      schema: yup.object({
        test: yup.string().required(REQUIRED_MSG).email(EMAIL_MSG),
      })
    }
  },
  methods: {
    submit(values) {
      console.log(values)
    }
  },
  emits: ['cancel']
}
</script>

<template>
  <Form :validation-schema="schema" @submit="submit" v-slot="{isValidating}">
    <app-input label="test" name="test"/>
    <modal-form-buttons :disabledSubmit="!isValidating" @cancel="$emit('cancel')"/>
  </Form>
</template>