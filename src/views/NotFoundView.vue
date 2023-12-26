<script setup lang="ts">
import localize from '@/utils/localize'
</script>

<template>
  <p>
    {{ localize('NotFoundText') }}
    <router-link :to="{ name: 'home' }"
      >{{ localize('HomePage') }}.</router-link
    >
  </p>
</template>
