<template>
  <div class="app-loader">
    <div class="preloader-wrapper active">
      <div
        :class="color"
        class="spinner-layer"
      >
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const colors = [
  'spinner-red-only',
  'spinner-blue-only',
  'spinner-green-only'
] as const

const color = computed(() => colors[Math.floor(Math.random() * colors.length)])
</script>
