<template>
  <div class="grey darken-1 empty-layout">
    <RouterView />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import localizeFilter from '@/filters/localize.filter'
import messages from '@/utils/messages'

export default {
  computed: {
    ...mapGetters(['error'])
  },
  watch: {
    error({ code }) {
      this.$error(localizeFilter(messages[code] ?? 'SomethingWentWrong'))
    }
  }
}
</script>
