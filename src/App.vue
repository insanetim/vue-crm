<template>
  <metainfo>
    <template #title="{ content }">{{ appTitle(content) }}</template>
  </metainfo>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import EmptyLayout from '@/layouts/EmptyLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import appTitle from '@/utils/appTitle'

export default {
  components: { EmptyLayout, MainLayout },
  setup() {
    const route = useRoute()
    const layout = computed(() => `${route.meta.layout || 'empty'}-layout`)

    return { appTitle, layout }
  }
}
</script>
