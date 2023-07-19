<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="!ready" />

    <p
      class="center"
      v-else-if="!records.length"
    >
      Записей пока нет. <RouterLink to="/record">Добавите первую.</RouterLink>
    </p>

    <section v-else>
      <HistoryTable :records="records" />
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import isReady from '@/helpers/isReady'
import HistoryTable from '@/components/HistoryTable'

export default {
  name: 'history',
  computed: {
    ...mapGetters(['categories']),
    records() {
      return this.$store.getters.records.map(r => {
        return {
          ...r,
          categoryName: this.categories.find(c => c.id === r.categoryId).title,
          typeClass: r.type === 'income' ? 'green' : 'red',
          typeText: r.type === 'income' ? 'Доход' : 'Расход'
        }
      })
    },
    ready() {
      return isReady(this.$store.getters.categoriesReady, this.$store.getters.recordsReady)
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchCategories')
    await this.$store.dispatch('fetchRecords')
  },
  components: { HistoryTable }
}
</script>
