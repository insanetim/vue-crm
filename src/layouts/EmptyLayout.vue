<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import localize from '@/utils/localize'
import messages from '@/utils/messages'
import { computed, inject, watch } from 'vue'

const appStore = useAppStore()
const $error = inject('$error')
const error = computed(() => appStore.error)

watch(error, ({ code }) => {
  $error(localize(messages[code] ?? 'SomethingWentWrong'))
})
</script>
@/stores/app @/stores/app
