import {
  child,
  get,
  getDatabase,
  onValue,
  push,
  ref,
  update
} from 'firebase/database'
import { defineStore } from 'pinia'

import { useAppStore } from './app'
import { useAuthStore } from './auth'

export const useCategoryStore = defineStore('category', {
  actions: {
    async createCategory({ limit, title }) {
      try {
        const db = getDatabase()
        const authStore = useAuthStore()
        const uid = authStore.getUid()
        await push(ref(db, `/users/${uid}/categories`), { limit, title })
      } catch (e) {
        const appStore = useAppStore()
        appStore.setError(e)
        throw e
      }
    },
    fetchCategories() {
      return new Promise(resolve => {
        ;(async () => {
          try {
            const db = getDatabase()
            const authStore = useAuthStore()
            const uid = authStore.getUid()
            onValue(ref(db, `/users/${uid}/categories`), snapshot => {
              const categories = snapshot.val() || {}
              this.categories = Object.keys(categories).map(id => ({
                id,
                ...categories[id]
              }))
              resolve()
            })
          } catch (e) {
            const appStore = useAppStore()
            appStore.setError(e)
            throw e
          }
        })()
      })
    },
    async fetchCategoryById(id) {
      try {
        const db = getDatabase()
        const authStore = useAuthStore()
        const uid = authStore.getUid()
        const category = (
          await get(child(ref(db, `/users/${uid}/categories`), id))
        ).val()

        return { id, ...category }
      } catch (e) {
        const appStore = useAppStore()
        appStore.setError(e)
        throw e
      }
    },
    async updateCategory({ id, limit, title }) {
      try {
        const db = getDatabase()
        const authStore = useAuthStore()
        const uid = authStore.getUid()
        await update(child(ref(db, `/users/${uid}/categories`), id), {
          limit,
          title
        })
      } catch (e) {
        const appStore = useAppStore()
        appStore.setError(e)
        throw e
      }
    }
  },
  state: () => ({
    categories: []
  })
})
