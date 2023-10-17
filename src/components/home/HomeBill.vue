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

<script setup lang="ts">
import { computed } from 'vue'

import type { Currencies, CurrenciesResponse } from '@/types'
import { currencies } from '@/constants'
import { useInfoStore } from '@/stores/info'
import currencyFormat from '@/utils/currencyFormat'
import localize from '@/utils/localize'

type PropTypes = {
  rates: CurrenciesResponse['rates']
}

const { rates } = defineProps<PropTypes>()

const infoStore = useInfoStore()

const base = computed(() => infoStore.bill! / rates.UAH)

const getCurrency = (currency: Currencies) =>
  Math.round(base.value * rates[currency])
</script>
