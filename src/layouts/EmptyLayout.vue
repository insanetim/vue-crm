<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useWatchError } from '@/composables/useWatchError'

useWatchError()
</script>
