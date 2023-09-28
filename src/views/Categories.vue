<template>
  <div>
    <div class="page-title">
      <h3>{{ localize('Categories') }}</h3>
    </div>
    <section>
      <app-loader v-if="!ready"></app-loader>

      <div
        class="row"
        v-else
      >
        <category-create></category-create>

        <category-edit v-if="categories.length"></category-edit>

        <p
          class="center"
          v-else
        >
          {{ localize('NoCategories') }}
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useMeta } from 'vue-meta'
import { useStore } from 'vuex'

import CategoryCreate from '../components/category/CategoryCreate.vue'
import CategoryEdit from '../components/category/CategoryEdit.vue'
import isReady from '../helpers/isReady'
import localize from '../utils/localize'

useMeta({ title: 'Menu_Categories' })

const store = useStore()
const categories = computed(() => store.getters['category/categories'])
const ready = computed(() => isReady(store.getters['category/categoriesReady']))

onMounted(async () => {
  await store.dispatch('category/fetchCategories')
})
</script>
