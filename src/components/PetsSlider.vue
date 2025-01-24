<script setup>
import { ref, onMounted, computed } from 'vue'
import { register } from 'swiper/element/bundle'
import ArrowIcon from '@/icons/ArrowIcon.vue'
import { Navigation } from 'swiper/modules'

register()

const props = defineProps({
  images: {
    type: Array,
    required: true
  }
})

const swiper = ref()

const activeImage = ref(props.images[0])

const params = {
  modules: [Navigation],
  slidesPerView: 4,
  spaceBetween: 3,
  direction: 'vertical',
  mousewheel: true,
  grabCursor: true,
  navigation: {
    prevEl: '.slider__arrow_prev',
    nextEl: '.slider__arrow_next'
  }
}

onMounted(() => {
  Object.assign(swiper.value, params)
  swiper.value.initialize()
})
</script>

<template>
  <div class="pets-slider">
    <div class="slider">
      <swiper-container ref="swiper" class="slider__container" init="false">
        <swiper-slide
          class="slider__slide"
          v-for="(url, idx) in images"
          :key="idx"
          @click="activeImage = url"
        >
          <img class="slider__img" :src="url" alt="" />
        </swiper-slide>
      </swiper-container>
      <button class="slider__arrow slider__arrow_prev" aria-label="Назад">
        <ArrowIcon />
      </button>
      <button class="slider__arrow slider__arrow_next" aria-label="Вперед">
        <ArrowIcon />
      </button>
    </div>
    <img :src="activeImage" alt="" class="image" />
  </div>
</template>

<style scoped>
.pets-slider {
  display: flex;
  gap: 7px;
}

.slider {
  position: relative;
  height: 376px;
  width: 68px;
}

.slider__container {
  height: 376px;
  width: 68px;
}

.slider__slide {
  position: relative;
  border-radius: var(--base-rounded);
  overflow: hidden;
}

.slider__slide img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.slider__slide::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.slider__slide:hover::before {
  background: rgba(0, 0, 0, 0);
}

.slider__arrow {
  width: 24px;
  height: 24px;
  border-radius: 100px;
  background: var(--on-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  opacity: 0;
  transition: all 0.3s ease;
}

.slider__arrow_prev {
  top: -12px;
  transform: translateX(-50%) rotate(180deg);
}

.slider__arrow_next {
  bottom: -12px;
}

.slider__arrow:hover {
  opacity: 0.7;
}

.slider__arrow:disabled {
  display: none;
}

.image {
  border-radius: var(--base-rounded);
  height: 376px;
  width: 208px;
  object-fit: cover;
}

@media (max-width: 390.98px) {
  .image {
    width: 170px;
  }
}
</style>
