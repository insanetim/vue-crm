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
      v-else
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

<script setup>
import HomeBill from '@/components/home/HomeBill.vue'
import HomeCurrency from '@/components/home/HomeCurrency.vue'
import { useAppStore } from '@/stores/app'
import localize from '@/utils/localize'
import { onMounted, ref } from 'vue'
import { useMeta } from 'vue-meta'

useMeta({ title: 'Menu_Bill' })

const appStore = useAppStore()
const currency = ref(null)
const loading = ref(true)

const refresh = async () => {
  loading.value = true
  currency.value = await appStore.fetchCurrency()
  loading.value = false
}

onMounted(async () => {
  currency.value = await appStore.fetchCurrency()
  loading.value = false
})
</script>
@/stores/app
