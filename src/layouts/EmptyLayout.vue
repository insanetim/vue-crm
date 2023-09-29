<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script setup>
import { computed, inject, watch } from 'vue'
import { useStore } from 'vuex'

import localize from '../utils/localize'
import messages from '../utils/messages'

const store = useStore()
const $error = inject('$error')
const error = computed(() => store.getters.error)

watch(error, ({ code }) => {
  $error(localize(messages[code] ?? 'SomethingWentWrong'))
})
</script>
