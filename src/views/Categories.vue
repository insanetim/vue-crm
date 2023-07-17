<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div
        class="row"
        v-else
      >
        <CategoryCreate />

        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
        />
        <p
          v-else
          class="center"
        >
          Категорий пока нет
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'

export default {
  name: 'categories',
  data: () => ({
    loading: true
  }),
  computed: {
    categories() {
      return this.$store.getters.categories
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  components: { CategoryCreate, CategoryEdit }
}
</script>
