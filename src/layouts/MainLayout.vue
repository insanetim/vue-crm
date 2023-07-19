<template>
  <div>
    <Loader v-if="loading" />
    <div
      class="app-main-layout"
      v-else
    >
      <Navbar @click="isOpen = !isOpen" />

      <Sidebar v-model="isOpen" />

      <main
        class="app-content"
        :class="{ full: !isOpen }"
      >
        <div class="app-page">
          <RouterView />
        </div>
      </main>

      <div class="fixed-action-btn">
        <RouterLink
          class="btn-floating btn-large blue"
          to="/record"
          v-tooltip="{
            html: 'Создать новую запись',
            position: 'left'
          }"
        >
          <i class="large material-icons">add</i>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import messages from '@/utils/messages'
import Navbar from '../components/app/Navbar'
import Sidebar from '../components/app/Sidebar'

export default {
  data: () => ({
    isOpen: true,
    loading: true
  }),
  computed: {
    ...mapGetters(['error'])
  },
  watch: {
    error({ code }) {
      this.$error(messages[code] || 'Что-то пошло не так')
    }
  },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  },
  components: { Navbar, Sidebar }
}
</script>
