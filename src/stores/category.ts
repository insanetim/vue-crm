import type { FirebaseError } from 'firebase/app'
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

import type { UserCategory, CategoryPersistent } from '@/types'
import { useAppStore } from './app'
import { useAuthStore } from './auth'

type StateShape = {
  categories: CategoryPersistent[]
}

export const useCategoryStore = defineStore('category', {
  state: (): StateShape => ({
    categories: []
  }),
  actions: {
    async createCategory({ limit, title }: UserCategory) {
      try {
        const db = getDatabase()
        const authStore = useAuthStore()
        const uid = authStore.getUid()
        await push(ref(db, `/users/${uid}/categories`), { limit, title })
      } catch (e) {
        const appStore = useAppStore()
        appStore.setError(e as FirebaseError)
        throw e
      }
    },
    fetchCategories() {
      return new Promise<void>(resolve => {
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
            appStore.setError(e as FirebaseError)
            throw e
          }
        })()
      })
    },
    async fetchCategoryById(id: string) {
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
        appStore.setError(e as FirebaseError)
        throw e
      }
    },
    async updateCategory({ id, limit, title }: CategoryPersistent) {
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
        appStore.setError(e as FirebaseError)
        throw e
      }
    }
  }
})
