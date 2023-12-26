import type { FirebaseError } from 'firebase/app'
import { defineStore } from 'pinia'

import type { UserCategory, CategoryPersistent } from '@/types'
import {
  createUserCategory,
  getUserCategories,
  getUserCategoryById,
  updateUserCategory,
} from '@/services/firebase'
import useErrorHandler from '@/composables/useErrorHandler'

type StateShape = {
  categories: CategoryPersistent[]
}

export const useCategoryStore = defineStore('category', {
  state: (): StateShape => ({
    categories: [],
  }),
  actions: {
    async createCategory(categoryInfo: UserCategory) {
      try {
        const { key } = await createUserCategory(categoryInfo)
        this.categories.push({ id: key as string, ...categoryInfo })
      } catch (error) {
        useErrorHandler(error as FirebaseError)
      }
    },
    async fetchCategories() {
      try {
        const categories = (await getUserCategories()) ?? {}
        this.categories = Object.keys(categories).map(id => ({
          id,
          ...categories[id],
        }))
      } catch (error) {
        useErrorHandler(error as FirebaseError)
      }
    },
    async fetchCategoryById(id: string): Promise<CategoryPersistent | void> {
      try {
        return await getUserCategoryById(id)
      } catch (error) {
        useErrorHandler(error as FirebaseError)
      }
    },
    async updateCategory({ id, limit, title }: CategoryPersistent) {
      try {
        await updateUserCategory({ id, limit, title })
        const index = this.categories.findIndex(category => category.id === id)
        this.categories[index] = { id, limit, title }
      } catch (error) {
        useErrorHandler(error as FirebaseError)
      }
    },
  },
})
