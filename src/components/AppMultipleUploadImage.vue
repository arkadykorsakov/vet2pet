<script>
import PictureIcon from '@/icons/PictureIcon.vue'
import AppButton from '@/components/AppButton.vue'
import { useField } from 'vee-validate'
import { onMounted, ref, useId, useTemplateRef, watch } from 'vue'
import AppFormError from '@/components/AppFormError.vue'
import CameraIcon from '@/icons/CameraIcon.vue'
import XThirdIcon from '@/icons/XThirdIcon.vue'

export default {
  name: 'AppUploadImage',
  components: { XThirdIcon, CameraIcon, AppFormError, AppButton, PictureIcon },
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    modelValue: {
      type: Array,
      required: false
    },
    value: {
      type: Array,
      default: undefined
    },
    disabled: { type: Boolean, default: false }
  },
  setup(props) {
    const {
      value: files,
      errorMessage,
      setErrors,
      resetField,
      setValue
    } = useField(props.name, undefined, {
      initialValue: props.modelValue,
      syncVModel: true,
      validateOnValueUpdate: false
    })

    const id = useId()
    const sources = ref([])
    const savesFiles = ref([])
    const inputEl = useTemplateRef('inputEl')

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

    const convertUrlsToFiles = async (urls) => {
      const filePromises = urls.map(async (url) => {
        const response = await fetch(url)
        const blob = await response.blob()
        const fileName = url.split('/').pop() || 'file.jpg'
        return new File([blob], fileName, { type: blob.type })
      })
      return Promise.all(filePromises)
    }

    const uploadFiles = async (event) => {
      setErrors(null)
      const newFiles = Array.from(event.target.files)

      if (!newFiles.every((file) => allowedTypes.includes(file.type))) {
        alert('Допустимые форматы: JPEG, PNG, GIF, WebP.')
        event.target.value = ''
        return
      }

      savesFiles.value.push(...newFiles)
      sources.value = savesFiles.value.map((file) => URL.createObjectURL(file))
      setValue(savesFiles.value)
    }

    const deleteFile = (idx) => {
      savesFiles.value = savesFiles.value.filter(
        (file, idxFile) => idxFile !== idx
      )
      sources.value = savesFiles.value.map((file) => URL.createObjectURL(file))
      setValue(savesFiles.value)
    }

    watch(files, async (newValue) => {
      if (!newValue || newValue.length === 0) {
        sources.value = []
        savesFiles.value = []
      }
    })

    onMounted(async () => {
      if (files.value && typeof files.value[0] === 'string') {
        const uploadedFiles = await convertUrlsToFiles(files.value)
        savesFiles.value.push(...uploadedFiles)
        sources.value = uploadedFiles.map((file) => URL.createObjectURL(file))
        setValue(uploadedFiles)
      }
    })

    return {
      uploadFiles,
      errorMessage,
      setErrors,
      id,
      resetField,
      files,
      sources,
      inputEl,
      deleteFile
    }
  }
}
</script>

<template>
  <div class="upload-file">
    <div class="upload-file__group">
      <div v-for="(src, idx) in sources" :key="idx" class="upload-file__file">
        <img :src="src" alt="Фотографии" class="upload-file__img" />
        <button
          type="button"
          @click="deleteFile(idx)"
          class="upload-file__delete"
          aria-label="Удалить"
        >
          <XThirdIcon />
        </button>
      </div>
      <button
        type="button"
        aria-label="Загрузить фотографии"
        class="upload-file__btn"
        @click="() => $refs.inputEl?.click()"
      >
        <CameraIcon />
      </button>
      <input
        type="file"
        :id="id"
        :name="name"
        @change="uploadFiles"
        multiple
        ref="inputEl"
        class="visually-hidden"
      />
      <label :for="id" class="visually-hidden">{{ label }}</label>
    </div>
    <AppFormError :error-message="errorMessage" v-if="errorMessage" />
  </div>
</template>

<style scoped>
.upload-file__group {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 5px;
}

.upload-file__group img {
  display: block;
  height: 91px;
  width: 100%;
  object-fit: cover;
  border-radius: var(--base-rounded);
}

.upload-file__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 91px;
  background: var(--surface-bright);
  border-radius: var(--base-rounded);
  width: 100%;
}

.upload-file__file {
  position: relative;
}

.upload-file__delete {
  position: absolute;
  right: -8px;
  top: -8px;
}

@media (max-width: 767.98px) {
  .upload-file__group {
    grid-template-columns: repeat(7, 1fr);
  }
}

@media (max-width: 575.98px) {
  .upload-file__group {
    grid-template-columns: repeat(6, 1fr);
  }
}

@media (max-width: 390.98px) {
  .upload-file__group {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
