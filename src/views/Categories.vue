<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Categories' | localize }}</h3>
    </div>
    <section>
      <Loader v-if="!ready" />

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
          {{ 'NoCategories' | localize }}
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'
import isReady from '@/helpers/isReady'

export default {
  name: 'categories',
  computed: {
    ...mapGetters(['categories']),
    ready() {
      return isReady(this.$store.getters.categoriesReady)
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchCategories')
  },
  components: { CategoryCreate, CategoryEdit }
}
</script>
