<template>
  <metainfo>
    <template #title="{ content }">{{ appTitle(content) }}</template>
  </metainfo>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import EmptyLayout from './layouts/EmptyLayout'
import MainLayout from './layouts/MainLayout'
import appTitle from './utils/appTitle'

export default {
  components: { EmptyLayout, MainLayout },
  setup() {
    const route = useRoute()

    const layout = computed(() => `${route.meta.layout || 'empty'}-layout`)

    return { appTitle, layout }
  }
}
</script>
