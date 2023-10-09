<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('Menu_Planning') }}</h3>
      <h4>{{ currencyFormat(info.bill) }}</h4>
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
      <router-link :to="{ name: 'category' }">
        {{ localize('AddFirst') }}
      </router-link>
    </p>
  </div>
</template>

<script setup>
import { useCategoryStore } from '@/stores/category'
import { useInfoStore } from '@/stores/info'
import { useRecordStore } from '@/stores/record'
import currencyFormat from '@/utils/currencyFormat'
import localize from '@/utils/localize'
import { computed, onMounted, ref } from 'vue'
import { useMeta } from 'vue-meta'

useMeta({ title: 'Menu_Planning' })

const infoStore = useInfoStore()
const recordStore = useRecordStore()
const categoryStore = useCategoryStore()
const loading = ref(true)
const info = computed(() => infoStore.info)
const records = computed(() => recordStore.records)
const categories = computed(() => {
  return categoryStore.categories.map(c => {
    const balance = records.value
      .filter(r => r.categoryId === c.id)
      .reduce((total, r) => {
        return r.type === 'outcome' ? total + r.amount : total - r.amount
      }, 0)
    const percent = (100 * balance) / c.limit
    const progressPercent = Math.min(percent, 100)
    const progressColor =
      percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'

    const tooltipValue = c.limit - balance
    const tooltip = `${
      tooltipValue < 0 ? localize('MoreThan') : localize('Stayed')
    } ${currencyFormat(Math.abs(tooltipValue))}`

    return {
      ...c,
      balance,
      progressColor,
      progressPercent,
      tooltip
    }
  })
})

onMounted(async () => {
  await categoryStore.fetchCategories()
  await recordStore.fetchRecords()
  loading.value = false
})
</script>
