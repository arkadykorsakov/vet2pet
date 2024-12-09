<script>
export default {
  name: "AppTitle",
  props: {
    tag: {
      type: String,
      required: false,
      default: 'h1',
      validator: value => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h6'].includes(value)
    },
    size: {
      type: String,
      required: false,
      default: 'md',
      validator: value => ['md', 'lg'].includes(value)
    },
    color: {
      type: String,
      required: false,
      default: 'secondary',
      validator: value => ['primary', 'secondary'].includes(value)
    }
  }
}
</script>

<template>
  <component :is="tag" class="title" :class="[size, color]">
    <slot/>
  </component>
</template>

<style scoped>
.title.md {
  font-size: 36px;

}

.title.lg {
  font-size: 57px;
  line-height: 1.1;
}

.title.primary {
  color: var(--primary);

}

.title.secondary {
  color: var(--secondary);
}
</style>