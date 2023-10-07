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
          {{ localize('NoCategories') }}
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import CategoryCreate from '@/components/category/CategoryCreate.vue'
import CategoryEdit from '@/components/category/CategoryEdit.vue'
import localize from '@/utils/localize'
import { computed, onMounted, ref } from 'vue'
import { useMeta } from 'vue-meta'
import { useStore } from 'vuex'

useMeta({ title: 'Menu_Categories' })

const store = useStore()
const loading = ref(true)
const categories = computed(() => store.getters['category/categories'])

onMounted(async () => {
  await store.dispatch('category/fetchCategories')
  loading.value = false
})
</script>
