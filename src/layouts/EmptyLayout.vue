<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script setup>
import localize from '@/utils/localize'
import messages from '@/utils/messages'
import { computed, inject, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const $error = inject('$error')
const error = computed(() => store.getters.error)

watch(error, ({ code }) => {
  $error(localize(messages[code] ?? 'SomethingWentWrong'))
})
</script>
