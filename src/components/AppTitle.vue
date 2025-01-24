<script>
export default {
  name: 'AppTitle',
  props: {
    tag: {
      type: String,
      required: false,
      default: 'h1',
      validator: (value) =>
        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h6'].includes(value)
    },
    size: {
      type: String,
      required: false,
      default: 'md',
      validator: (value) => ['md', 'lg'].includes(value)
    },
    color: {
      type: String,
      required: false,
      default: 'secondary',
      validator: (value) => ['primary', 'secondary', 'third'].includes(value)
    }
  }
}
</script>

<template>
  <component :is="tag" class="title" :class="[size, color]">
    <slot />
  </component>
</template>

<style scoped>
.title {
  word-wrap: break-word;
  word-break: break-all;
}

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

.title.third {
  color: var(--secondary-container);
}

@media (max-width: 991.98px) {
  .title.md {
    font-size: 24px;
  }

  .title.lg {
    font-size: 36px;
    line-height: 1.1;
  }
}
</style>
