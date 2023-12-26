<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useMeta } from 'vue-meta'

import type { CategoryPersistent } from '@/types'
import { useCategoryStore } from '@/stores/category'
import localize from '@/utils/localize'
import CategoryCreate from '@/components/category/CategoryCreate.vue'
import CategoryEdit from '@/components/category/CategoryEdit.vue'

useMeta({ title: 'Menu_Categories' })
const categoryStore = useCategoryStore()

const loading = ref(true)
const categories = computed<CategoryPersistent[]>(
  () => categoryStore.categories
)

onMounted(async () => {
  await categoryStore.fetchCategories()
  loading.value = false
})
</script>

<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('Categories') }}</h3>
    </div>
    <section>
      <app-loader v-if="loading" />

      <div
        v-else
        class="row"
      >
        <category-create />

        <category-edit v-if="categories.length" />

        <p
          v-else
          class="center"
        >
          {{ localize('NoCategories') }}.
        </p>
      </div>
    </section>
  </div>
</template>
