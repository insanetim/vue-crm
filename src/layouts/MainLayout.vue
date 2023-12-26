<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useToggle } from '@vueuse/core'

import type { UserInfo } from '@/types'
import { useInfoStore } from '@/stores/info'
import { useWatchError } from '@/composables/useWatchError'
import AppNavbar from '@/components/app/AppNavbar.vue'
import AppSidebar from '@/components/app/AppSidebar.vue'

const infoStore = useInfoStore()
const loading = ref(true)
const info = computed<UserInfo | null>(() => infoStore.info)
const [isOpen, toggle] = useToggle(true)

useWatchError()

onMounted(async () => {
  if (!info.value) {
    await infoStore.fetchInfo()
  }
  loading.value = false
})
</script>

<template>
  <div>
    <app-loader v-if="loading" />

    <div
      v-else
      class="app-main-layout"
    >
      <app-navbar @toggle="toggle()" />

      <app-sidebar
        :key="infoStore.locale"
        :is-open="isOpen"
      />

      <main :class="['app-content', { full: !isOpen }]">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          :key="infoStore.locale"
          v-tooltip="{
            html: 'CreateNewRecord',
            position: 'left',
          }"
          class="btn-floating btn-large blue"
          :to="{ name: 'record' }"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>
