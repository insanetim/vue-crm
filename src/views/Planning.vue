<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Menu_Planning' | localize }}</h3>
      <h4>{{ info.bill | currency }}</h4>
    </div>

    <Loader v-if="!ready" />

    <p
      class="center"
      v-else-if="!categories.length"
    >
      {{ 'NoCategories' | localize }}.
      <RouterLink to="/categories">{{ 'AddFirst' | localize }}</RouterLink>
    </p>

    <section v-else>
      <div
        v-for="cat in categories"
        :key="cat.id"
        v-tooltip.noloc="{ html: cat.tooltip }"
      >
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ cat.balance | currency }} {{ 'Of' | localize }} {{ cat.limit | currency }}
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
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'
import isReady from '@/helpers/isReady'

export default {
  name: 'planning',
  metaInfo() {
    return {
      title: this.$title('Menu_Planning')
    }
  },
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
        const tooltip = `${tooltipValue < 0 ? localizeFilter('MoreThan') : localizeFilter('Stayed')} ${currencyFilter(
          Math.abs(tooltipValue)
        )}`

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
