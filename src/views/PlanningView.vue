<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useMeta } from 'vue-meta'

import { useCategoryStore } from '@/stores/category'
import { useInfoStore } from '@/stores/info'
import { useRecordStore } from '@/stores/record'
import currencyFormat from '@/utils/currencyFormat'
import localize from '@/utils/localize'
import type { CategoryPersistent, RecordPersistent, UserInfo } from '@/types'

type CategoryExtended = CategoryPersistent & {
  balance: number
  progressColor: string
  progressPercent: number
  tooltip: string
}

useMeta({ title: 'Menu_Planning' })
const infoStore = useInfoStore()
const recordStore = useRecordStore()
const categoryStore = useCategoryStore()

const loading = ref(true)
const info = computed<UserInfo | null>(() => infoStore.info)
const records = computed<RecordPersistent[]>(() => recordStore.records)
const categories = computed<CategoryExtended[]>(() => {
  return categoryStore.categories.map(category => {
    const balance = records.value
      .filter(record => record.categoryId === category.id)
      .reduce((total, record) => {
        return record.type === 'outcome'
          ? total + record.amount
          : total - record.amount
      }, 0)
    const percent = (100 * balance) / category.limit
    const progressPercent = Math.min(percent, 100)
    const progressColor =
      percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'

    const tooltipValue = category.limit - balance
    const tooltip = `${
      tooltipValue < 0 ? localize('MoreThan') : localize('Stayed')
    } ${currencyFormat(Math.abs(tooltipValue))}`

    return {
      ...category,
      balance,
      progressColor,
      progressPercent,
      tooltip,
    }
  })
})

onMounted(async () => {
  await categoryStore.fetchCategories()
  await recordStore.fetchRecords()
  loading.value = false
})
</script>

<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('Menu_Planning') }}</h3>
      <h4>{{ currencyFormat(info!.bill) }}</h4>
    </div>

    <app-loader v-if="loading" />

    <section v-else-if="categories.length">
      <div
        v-for="cat in categories"
        :key="cat.id"
        v-tooltip.noloc="{ html: cat.tooltip }"
      >
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ currencyFormat(cat.balance) }} {{ localize('Of') }}
          {{ currencyFormat(cat.limit) }}
        </p>
        <div class="progress">
          <div
            :class="[cat.progressColor]"
            :style="{ width: `${cat.progressPercent}%` }"
            class="determinate"
          ></div>
        </div>
      </div>
    </section>

    <p
      v-else
      class="center"
    >
      {{ localize('NoCategories') }}.
      <router-link :to="{ name: 'categories' }">
        {{ localize('AddFirst') }}.
      </router-link>
    </p>
  </div>
</template>
