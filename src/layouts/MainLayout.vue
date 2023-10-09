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
          v-tooltip="{
            html: 'CreateNewRecord',
            position: 'left'
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

<script setup>
import AppNavbar from '@/components/app/AppNavbar.vue'
import AppSidebar from '@/components/app/AppSidebar.vue'
import { useAppStore } from '@/stores/app'
import { useInfoStore } from '@/stores/info'
import localize from '@/utils/localize'
import messages from '@/utils/messages'
import { useToggle } from '@vueuse/core'
import { computed, inject, onMounted, ref, watch } from 'vue'

const appStore = useAppStore()
const infoStore = useInfoStore()
const loading = ref(true)
const $error = inject('$error')
const info = computed(() => infoStore.info)
const error = computed(() => appStore.error)
const [isOpen, toggle] = useToggle(true)

watch(error, ({ code }) => {
  $error(localize(messages[code] ?? 'SomethingWentWrong'))
})

onMounted(async () => {
  if (!Object.keys(info.value).length) {
    await infoStore.fetchInfo()
  }
  loading.value = false
})
</script>
@/stores/app @/stores/app@/stores/info
