<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('Menu_Planning') }}</h3>
      <h4>{{ currencyFormat(info.bill) }}</h4>
    </div>

    <app-loader v-if="!ready" />

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
          />
        </div>
      </div>
    </section>

    <p
      v-else
      class="center"
    >
      {{ localize('NoCategories') }}.
      <router-link to="/categories">{{ localize('AddFirst') }}</router-link>
    </p>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useMeta } from 'vue-meta'
import { useStore } from 'vuex'

import isReady from '../helpers/isReady'
import currencyFormat from '../utils/currencyFormat'
import localize from '../utils/localize'

useMeta({ title: 'Menu_Planning' })

const store = useStore()
const info = computed(() => store.getters['info/info'])
const records = computed(() => store.getters['record/records'])
const categories = computed(() => {
  return store.getters['category/categories'].map(c => {
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
const ready = computed(() => {
  return isReady(
    store.getters['category/categoriesReady'],
    store.getters['record/recordsReady']
  )
})

onMounted(async () => {
  await store.dispatch('category/fetchCategories')
  await store.dispatch('record/fetchRecords')
})
</script>
