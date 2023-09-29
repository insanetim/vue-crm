<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{ localize('BillInCurrency') }}</span>

        <p
          v-for="cur in currencies"
          :key="cur"
          class="currency-line"
        >
          <span>
            {{ currencyFormat(getCurrency(cur), cur) }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

import { currencies } from '../../constants'
import currencyFormat from '../../utils/currencyFormat'
import localize from '../../utils/localize'

const store = useStore()
const { rates } = defineProps({
  rates: {
    required: true,
    type: Object
  }
})
const base = computed(() => store.getters['info/info'].bill / rates.UAH)

const getCurrency = currency => Math.round(base.value * rates[currency])
</script>
