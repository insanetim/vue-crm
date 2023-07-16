<template>
  <div class="grey darken-1 empty-layout">
    <RouterView />
  </div>
</template>

<script>
import messages from '@/utils/messages'

export default {
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error({ code }) {
      this.$error(messages[code] || 'Что-то пошло не так')
    }
  }
}
</script>
