<script>
import ArrowLeftIcon from '@/icons/ArrowLeftIcon.vue'
import ArrowRightIcon from '@/icons/ArrowRightIcon.vue'
import { range } from 'lodash'

export default {
  name: 'AppPagination',
  components: { ArrowRightIcon, ArrowLeftIcon },
  props: {
    countPages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  emits: ['changePage'],
  computed: {
    pages() {
      if (this.countPages < 6) return range(1, this.countPages + 1)
      if ([1, 2, 3].includes(this.currentPage)) return range(1, 6)
      if (
        range(this.countPages - 2, this.countPages + 1).includes(
          this.currentPage
        )
      )
        return range(this.countPages - 4, this.countPages + 1)
      return range(this.currentPage - 2, this.currentPage + 3)
    }
  },
  methods: {
    changePage(page) {
      this.$router.push({
        query: {
          page
        }
      })
      this.$emit('changePage', page)
    }
  },
  watch: {
    countPages(newVal, oldVal) {
      console.log(newVal, oldVal)
      if (newVal !== oldVal) {
        this.changePage(1)
      }
    }
  }
}
</script>

<template>
  <ul class="pagination" v-if="pages.length > 1">
    <li class="pagination__item pagination__item_prev">
      <button
        class="pagination__btn"
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      >
        <ArrowLeftIcon />
      </button>
    </li>
    <li class="pagination__item" v-for="item in pages" :key="item">
      <button
        class="pagination__btn"
        :class="{ active: item === currentPage }"
        @click="changePage(item)"
      >
        {{ item }}
      </button>
    </li>
    <li class="pagination__item pagination__item_next">
      <button
        class="pagination__btn"
        :disabled="currentPage === countPages"
        @click="changePage(currentPage + 1)"
      >
        <ArrowRightIcon />
      </button>
    </li>
  </ul>
</template>

<style scoped>
.pagination {
  display: flex;
  gap: 8px;
}

.pagination__item_prev {
  margin-right: 8px;
}

.pagination__item_next {
  margin-left: 8px;
}

.pagination__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--primary-fixed);
  color: var(--primary-fixed);
  min-width: 40px;
  height: 40px;
  padding: 10px;
  -webkit-border-radius: var(--base-rounded);
  -moz-border-radius: var(--base-rounded);
  border-radius: var(--base-rounded);
  background: transparent;
  transition: all 0.3s ease;
}

.pagination__btn:hover {
  background-color: rgba(var(--primary-fixed-rgb), 0.1);
}

.pagination__btn.active {
  background: var(--primary-fixed);
  color: var(--on-primary);
}

.pagination__btn:disabled {
  border-color: transparent;
  background-color: rgba(29, 27, 32, 0.12) !important;
  color: var(--on-surface) !important;
  cursor: not-allowed !important;
}

:deep(.pagination__btn:disabled svg path) {
  fill: var(--on-surface) !important;
}

@media (max-width: 767.98px) {
  .pagination__item:not(.pagination__item_prev),
  .pagination__item:not(.pagination__item_next) {
    display: none;
  }

  .pagination__item.pagination__item_prev,
  .pagination__item.pagination__item_next {
    display: block;
  }
}
</style>
