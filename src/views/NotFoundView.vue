<template>
  <p>
    {{ localize('NotFoundText') }}
    <router-link :to="{ name: 'home' }"
      >{{ localize('HomePage') }}.</router-link
    >
  </p>
</template>

<script setup>
import localize from '@/utils/localize'
</script>
