<script>
import GearWheelIcon from '@/icons/GearWheelIcon.vue'
import SortDefaultIcon from '@/icons/SortDefaultIcon.vue'
import SortAscIcon from '@/icons/SortAscIcon.vue'
import SortDescIcon from '@/icons/SortDescIcon.vue'
import AppModal from '@/components/AppModal.vue'
import AppPagination from '@/components/AppPagination.vue'
import { chunk } from 'lodash'
import { formatCurrency, formatNumber, formatDateTime } from '@/utils/formatter'

export default {
  name: 'AppTable',
  components: {
    AppPagination,
    AppModal,
    GearWheelIcon,
    SortDefaultIcon,
    SortAscIcon,
    SortDescIcon
  },
  props: {
    columns: { type: Array, required: true },
    rows: { type: Array, required: true },
    editable: {
      type: Boolean,
      default: false
    },
    titleModalEdit: {
      type: String,
      default: 'Обновить'
    }
  },
  data() {
    return {
      show: false,
      currentPage: +this.$route?.query?.page || 1,
      sortBy: '',
      sortField: ''
    }
  },
  methods: {
    closeModal() {
      this.show = false
    },
    openModal() {
      this.show = true
    },
    setSort(field) {
      if (this.sortField === field) {
        if (this.sortBy === 'asc') this.sortBy = 'desc'
        else if (this.sortBy === 'desc') {
          this.sortBy = ''
          this.sortField = ''
        }
      } else {
        this.sortField = field
        this.sortBy = 'asc'
      }
    },
    universalSort(arr, field, order = 'asc') {
      return arr.sort((a, b) => {
        let comparison = 0
        const valA = a[field]
        const valB = b[field]
        if (typeof valA === 'number' && typeof valB === 'number')
          comparison = valA - valB
        else if (typeof valA === 'string' && typeof valB === 'string')
          comparison = valA.localeCompare(valB)
        else comparison = String(valA).localeCompare(String(valB))
        return order === 'desc' ? -comparison : comparison
      })
    },
    formatNumber(value, options) {
      return formatNumber(value, options)
    },
    formatCurrency(value, options) {
      return formatCurrency(value, options)
    },
    formatDateTime(value, format = 'datetime') {
      return formatDateTime(value, format)
    }
  },
  computed: {
    sortedRows() {
      if (!this.sortField) return [...this.rows]
      else {
        return this.universalSort([...this.rows], this.sortField, this.sortBy)
      }
    },
    paginatedRows() {
      return chunk(this.sortedRows, 10)
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th
              scope="col"
              v-for="(col, colIdx) in columns"
              :key="colIdx"
              :style="col.style ? col.style : null"
            >
              <span
                class="table__sort"
                v-if="col.sortable"
                :style="{
                  justifyContent: col.align
                }"
              >
                <span>
                  {{ col.label }}
                </span>
                <button
                  type="button"
                  @click="setSort(col.field)"
                  :aria-label="`Сортировка по полю ${col.label}`"
                >
                  <SortDefaultIcon v-if="sortField !== col.field" />
                  <component
                    v-else
                    :is="sortBy === 'asc' ? 'SortAscIcon' : 'SortDescIcon'"
                  />
                </button>
              </span>
              <span v-else>
                {{ col.label }}
              </span>
            </th>
            <th v-if="editable"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIdx) in paginatedRows[currentPage - 1]"
            :key="rowIdx"
          >
            <td
              v-for="(col, colIdx) in columns"
              :key="colIdx"
              :style="col.style ? col.style : null"
              :align="col.align"
            >
              <template v-if="col.format === 'currency'">
                {{ formatCurrency(row[`${col.field}`]) }}
              </template>
              <template v-else-if="col.format === 'number'">
                {{ formatNumber(row[`${col.field}`]) }}
              </template>
              <template v-else-if="col.format === 'datetime'">
                {{ formatDateTime(new Date(row[`${col.field}`])) }}
              </template>
              <template v-else-if="col.format === 'date'">
                {{ formatDateTime(new Date(row[`${col.field}`]), 'date') }}
              </template>
              <template v-else-if="col.format === 'time'">
                {{ formatDateTime(new Date(row[`${col.field}`]), 'time') }}
              </template>
              <template v-else>
                {{ row[`${col.field}`] }}
              </template>
            </td>
            <td v-if="editable" class="table__edit">
              <div>
                <button
                  type="button"
                  aria-label="Редактировать"
                  @click="openModal"
                >
                  <GearWheelIcon />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination-wrapper">
      <AppPagination
        :count-pages="paginatedRows.length"
        :current-page="currentPage"
        @change-page="(page) => (currentPage = page)"
      />
    </div>
    <teleport to="body" v-if="editable">
      <AppModal :title="titleModalEdit" :show="show" @close="closeModal">
        <slot name="modal" :close="closeModal" />
      </AppModal>
    </teleport>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  overflow-x: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.table-wrapper {
  flex: 1 1 auto;
  width: 100%;
}

.table {
  width: 100%;
  border-spacing: 0 8px;
  border-collapse: separate;
}

.table th {
  color: var(--tertiary);
  padding: 8px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.table__sort {
  display: flex;
  align-items: center;
  gap: 8px;
}

.table tbody tr {
  background: var(--background);
  border-radius: var(--base-rounded);
  transition: all 0.3s ease;
}

.table tbody tr:hover {
  background: var(--surface-variant);
}

.table tbody tr td {
  padding: 20px 8px;
  box-sizing: border-box;
}

.table tbody tr td:first-child {
  border-radius: 8px 0 0 8px;
  padding: 20px 8px 20px 16px;
}

.table tbody tr td:last-child {
  border-radius: 0 8px 8px 0;
  padding: 20px 16px 20px 8px;
}

.table__edit {
  min-width: 54px;
  width: 54px;
}

.table__edit div {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.table__edit button {
  width: 100%;
  height: 22px;
  transition: transform 1s ease-in-out;
}

.table__edit svg {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.table__edit button:hover {
  transform: rotate(90deg);
}

.pagination-wrapper {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}
</style>
