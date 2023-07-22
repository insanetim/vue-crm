<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ info.bill | currency }}</h4>
    </div>

    <Loader v-if="!ready" />

    <p
      class="center"
      v-else-if="!categories.length"
    >
      Категорий пока нет. <RouterLink to="/categories">Добавить новую категорию.</RouterLink>
    </p>

    <section v-else>
      <div
        v-for="cat in categories"
        :key="cat.id"
        v-tooltip="{ html: cat.tooltip }"
      >
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ cat.balance | currency }} из {{ cat.limit | currency }}
        </p>
        <div class="progress">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{ width: `${cat.progressPercent}%` }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import isReady from '@/helpers/isReady'
import currencyFilter from '@/filters/currency.filter'

export default {
  name: 'planning',
  computed: {
    ...mapGetters(['info', 'records']),
    categories() {
      return this.$store.getters.categories.map(c => {
        const balance = this.records
          .filter(r => r.categoryId === c.id)
          .reduce((total, r) => {
            return r.type === 'outcome' ? total + r.amount : total - r.amount
          }, 0)
        const percent = (100 * balance) / c.limit
        const progressPercent = Math.min(percent, 100)
        const progressColor = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'

        const tooltipValue = c.limit - balance
        const tooltip = `${tooltipValue < 0 ? 'Превышение на' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`

        return {
          ...c,
          progressPercent,
          progressColor,
          balance,
          tooltip
        }
      })
    },
    ready() {
      return isReady(this.$store.getters.categoriesReady, this.$store.getters.recordsReady)
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchCategories')
    await this.$store.dispatch('fetchRecords')
  }
}
</script>
