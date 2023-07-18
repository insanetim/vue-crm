<template>
  <div class="grey darken-1 empty-layout">
    <RouterView />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import messages from '@/utils/messages'

export default {
  computed: {
    ...mapGetters(['error'])
  },
  watch: {
    error({ code }) {
      this.$error(messages[code] || 'Что-то пошло не так')
    }
  }
}
</script>
