<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('History_Title') }}</h3>
    </div>

    <div class="history-chart">
      <pie
        :data="chartData"
        :options="chartOptions"
      />
    </div>

    <app-loader v-if="loading" />

    <section v-else-if="records.length">
      <history-table :records="items" />

      <app-pagination
        v-if="records.length > items.length"
        v-model="page"
        :click-handler="pageChangeHandler"
        :container-class="'pagination'"
        :next-link-class="'waves-effect'"
        :next-text="localize('Forward')"
        :page-count="pageCount"
        :page-link-class="'waves-effect'"
        :prev-link-class="'waves-effect'"
        :prev-text="localize('Back')"
      />
    </section>

    <p
      v-else
      class="center"
    >
      {{ localize('NoRecords') }}.
      <router-link :to="{ name: 'record' }">
        {{ localize('AddFirst') }}
      </router-link>
    </p>
  </div>
</template>

<script setup>
import HistoryTable from '@/components/history/HistoryTable.vue'
import usePagination from '@/hooks/pagination'
import { useCategoryStore } from '@/stores/category'
import { useRecordStore } from '@/stores/record'
import localize from '@/utils/localize'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { computed, onMounted, ref, watch } from 'vue'
import { Pie } from 'vue-chartjs'
import { useMeta } from 'vue-meta'

ChartJS.register(Tooltip, Legend, ArcElement)

useMeta({ title: 'Menu_History' })

const categoryStore = useCategoryStore()
const recordStore = useRecordStore()
const loading = ref(true)
const categories = computed(() => categoryStore.categories)
const records = computed(() =>
  recordStore.records.map(r => ({
    ...r,
    categoryName: categories.value.find(c => c.id === r.categoryId).title,
    typeClass: r.type === 'income' ? 'green' : 'red',
    typeText: r.type === 'income' ? localize('Income') : localize('Outcome')
  }))
)
const chartData = computed(() => ({
  datasets: [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1,
      data: categories.value.map(c => {
        return records.value
          .filter(r => r.categoryId === c.id)
          .reduce((total, r) => {
            return r.type === 'outcome' ? total + r.amount : total - r.amount
          }, 0)
      })
    }
  ],
  labels: categories.value.map(c => c.title)
}))
const chartOptions = {
  maintainAspectRatio: false,
  responsive: true
}
const { items, page, pageChangeHandler, pageCount, setupPagination } =
  usePagination()

watch(
  loading,
  () => {
    setupPagination(records.value)
  },
  { immediate: true }
)

onMounted(async () => {
  await categoryStore.fetchCategories()
  await recordStore.fetchRecords()
  loading.value = false
})
</script>
@/stores/category@/stores/record
