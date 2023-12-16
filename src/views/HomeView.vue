<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('Bill') }}</h3>

      <button
        class="btn waves-effect waves-light btn-small"
        @click="refresh"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <app-loader v-if="loading" />

    <div
      v-else-if="currency"
      class="row"
    >
      <home-bill :rates="currency.rates" />

      <home-currency
        :date="currency.date"
        :rates="currency.rates"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMeta } from 'vue-meta'

import type { CurrenciesResponse } from '@/types'
import HomeBill from '@/components/home/HomeBill.vue'
import HomeCurrency from '@/components/home/HomeCurrency.vue'
import { useAppStore } from '@/stores/app'
import localize from '@/utils/localize'

useMeta({ title: 'Menu_Bill' })
const appStore = useAppStore()

const currency = ref<CurrenciesResponse | null>(null)
const loading = ref(true)

const refresh = async () => {
  loading.value = true
  currency.value = await appStore.fetchCurrencies()
  loading.value = false
}

onMounted(async () => {
  currency.value = await appStore.fetchCurrencies()
  loading.value = false
})
</script>
