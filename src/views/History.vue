<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <Pie
        :chart-data="chartData"
        :chart-options="chartOptions"
      />
    </div>

    <Loader v-if="!ready" />

    <p
      class="center"
      v-else-if="!records.length"
    >
      Записей пока нет. <RouterLink to="/record">Добавите первую.</RouterLink>
    </p>

    <section v-else>
      <HistoryTable :records="items" />

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Pie } from 'vue-chartjs/legacy'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js'
import isReady from '@/helpers/isReady'
import paginationMixin from '@/mixins/pagination.mixin'
import HistoryTable from '@/components/HistoryTable'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  name: 'history',
  mixins: [paginationMixin],
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
    chartData() {
      return {
        labels: this.categories.map(c => c.title),
        datasets: [
          {
            data: this.categories.map(c => {
              return this.records
                .filter(r => r.categoryId === c.id)
                .reduce((total, r) => {
                  return r.type === 'outcome' ? total + r.amount : total - r.amount
                }, 0)
            }),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false
      }
    },
    ready() {
      return isReady(this.$store.getters.categoriesReady, this.$store.getters.recordsReady)
    }
  },
  created() {
    this.$watch(
      () => this.ready,
      ready => {
        if (ready) {
          this.setupPagination(this.records)
        }
      },
      { immediate: true }
    )
  },
  async mounted() {
    await this.$store.dispatch('fetchCategories')
    await this.$store.dispatch('fetchRecords')
  },
  components: { HistoryTable, Pie }
}
</script>
