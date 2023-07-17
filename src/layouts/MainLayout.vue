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
        >
          <i class="large material-icons">add</i>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/app/Navbar'
import Sidebar from '../components/app/Sidebar'

export default {
  data: () => ({
    isOpen: true,
    loading: true
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
    this.loading = false
  },
  components: { Navbar, Sidebar }
}
</script>
