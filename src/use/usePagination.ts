import { pageSize } from '@/constants'
import _ from 'lodash'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function usePagination<T>() {
  const route = useRoute()
  const router = useRouter()
  const allItems = ref<T[][]>([])
  const items = ref<T[]>([])
  const page = ref<number>(route.query.page ? Number(route.query.page) : 1)
  const pageCount = ref<number>(0)

  watch(
    () => route.query.page,
    currentPage => {
      page.value = currentPage ? Number(currentPage) : 1
      items.value = currentPage
        ? allItems.value[Number(currentPage) - 1]
        : allItems.value[0]
    },
    { immediate: true }
  )

  const pageChangeHandler = (page: number) => {
    router.push({ path: route.path, query: { page } })
    items.value = allItems.value[page - 1] || allItems.value[0]
  }

  const setupPagination = (initItems: T[] = []) => {
    allItems.value = _.chunk<T>(initItems, pageSize) as never
    pageCount.value = _.size(allItems.value)
    items.value = allItems.value[page.value - 1] || allItems.value[0]
  }

  return { items, page, pageChangeHandler, pageCount, setupPagination }
}
