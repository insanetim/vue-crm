<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{ 'BillInCurrency' | localize }}</span>

        <p
          class="currency-line"
          v-for="cur in currencies"
          :key="cur"
        >
          <span>
            {{ getCurrency(cur) | currency(cur) }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { currencies } from '@/constants'

export default {
  props: ['rates'],
  data: () => ({
    currencies
  }),
  computed: {
    base() {
      return this.$store.getters.info.bill / this.rates['UAH']
    }
  },
  methods: {
    getCurrency(currency) {
      return Math.round(this.base * this.rates[currency])
    }
  }
}
</script>
