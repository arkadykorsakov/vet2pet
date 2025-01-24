<script>
import PictureIcon from '@/icons/PictureIcon.vue'
import AppButton from '@/components/AppButton.vue'
import { useField } from 'vee-validate'
import { onMounted, ref, useId, watch } from 'vue'
import AppFormError from '@/components/AppFormError.vue'

export default {
  name: 'AppUploadImage',
  components: { AppFormError, AppButton, PictureIcon },
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: Object,
      default: undefined
    },
    label: {
      type: String,
      required: true
    },
    modelValue: {
      type: Object,
      default: undefined
    },
    disabled: { type: Boolean, default: false }
  },
  setup(props) {
    const {
      value: file,
      handleChange,
      errorMessage,
      setErrors,
      resetField,
      setValue
    } = useField(props.name, undefined, {
      initialValue: props.value,
      syncVModel: true,
      validateOnValueUpdate: false
    })

    const id = useId()
    const imageSrc = ref(null)

    const uploadFile = (event) => {
      setErrors(null)
      const uploadedFile = event.target.files[0]
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/webp'
      ]
      if (!allowedTypes.includes(uploadedFile.type)) {
        alert(
          'Выбранный файл не является изображением. Допустимые форматы: JPEG, PNG, GIF, WebP, SVG.'
        )
        event.target.value = ''
        return
      }
      imageSrc.value = URL.createObjectURL(uploadedFile)
      handleChange(uploadedFile)
    }

    const convertUrlToFile = async (url) => {
      const response = await fetch(url)
      const blob = await response.blob()
      const fileName = url.split('/').pop() || 'file.jpg'
      return new File([blob], fileName, { type: blob.type })
    }

    watch(file, () => {
      if (!file.value) imageSrc.value = null
    })

    onMounted(async () => {
      if (file.value && typeof file.value === 'string') {
        const uploadedFile = await convertUrlToFile(file.value)
        imageSrc.value = URL.createObjectURL(uploadedFile)
        setValue(uploadedFile)
      }
    })

    return {
      uploadFile,
      errorMessage,
      setErrors,
      id,
      setValue,
      file,
      imageSrc
    }
  },
  data() {
    return {
      inputEl: null
    }
  }
}
</script>

<template>
  <div class="upload-file">
    <div class="upload-file__group">
      <div class="upload-file__view" v-if="!imageSrc">
        <PictureIcon />
      </div>
      <img :src="imageSrc" alt="Обзор" v-else class="upload-file__image" />
      <AppButton
        color="transparent"
        class="upload-file__upload"
        @click="() => $refs.inputEl?.click()"
        >Загрузить иконку
      </AppButton>
      <AppButton color="transparent" @click="setValue(null)" :disabled="!file"
        >Удалить</AppButton
      >
      <input
        type="file"
        :id="id"
        :name="name"
        @change="uploadFile"
        class="visually-hidden"
        ref="inputEl"
      />
      <label :for="id" class="visually-hidden">{{ label }}</label>
    </div>
    <AppFormError :error-message="errorMessage" v-if="errorMessage" />
  </div>
</template>

<style scoped>
.upload-file__group {
  width: 100%;
  max-width: 402px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
}

.upload-file__view {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: var(--surface-bright);
  border-radius: var(--base-rounded);
  flex-shrink: 0;
}

.upload-file__image {
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: var(--base-rounded);
}

.upload-file__upload {
  text-decoration: underline;
}
</style>
