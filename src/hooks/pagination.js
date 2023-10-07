import { pageSize } from '@/constants'
import _ from 'lodash'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default function usePagination() {
  const route = useRoute()
  const router = useRouter()
  const allItems = ref([])
  const items = ref([])
  const page = ref(route.query.page || 1)
  const pageCount = ref(0)

  watch(
    () => route.query.page,
    currentPage => {
      page.value = +currentPage || 1
      items.value = allItems.value[+currentPage - 1] || allItems.value[0]
    },
    { immediate: true }
  )

  const pageChangeHandler = page => {
    router.push({ path: route.path, query: { page } })
    items.value = allItems.value[page - 1] || allItems.value[0]
  }

  const setupPagination = (initItems = []) => {
    allItems.value = _.chunk(initItems, pageSize)
    pageCount.value = _.size(allItems.value)
    items.value = allItems.value[page.value - 1] || allItems.value[0]
  }

  return { items, page, pageChangeHandler, pageCount, setupPagination }
}
