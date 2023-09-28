<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('Bill') }}</h3>

      <button
        @click="refresh"
        class="btn waves-effect waves-light btn-small"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <app-loader v-if="loading"></app-loader>

    <div
      class="row"
      v-else
    >
      <home-bill :rates="currency.rates"></home-bill>

      <home-currency
        :date="currency.date"
        :rates="currency.rates"
      ></home-currency>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useMeta } from 'vue-meta'
import { useStore } from 'vuex'

import HomeBill from '../components/home/HomeBill.vue'
import HomeCurrency from '../components/home/HomeCurrency.vue'
import localize from '../utils/localize'

useMeta({ title: 'Menu_Bill' })

const store = useStore()
const currency = ref(null)
const loading = ref(true)

const refresh = async () => {
  loading.value = true
  currency.value = await store.dispatch('fetchCurrency')
  loading.value = false
}

onMounted(async () => {
  currency.value = await store.dispatch('fetchCurrency')
  loading.value = false
})
</script>
