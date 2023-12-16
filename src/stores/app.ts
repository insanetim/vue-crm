import type { FirebaseError } from 'firebase/app'
import { defineStore } from 'pinia'

import { getCurrencies } from '@/services/api'

type StateShape = {
  error: FirebaseError | null
}

export const useAppStore = defineStore('app', {
  state: (): StateShape => ({
    error: null
  }),
  actions: {
    async fetchCurrencies() {
      return await getCurrencies()
    },
    setError(error: FirebaseError) {
      this.error = error
    }
  }
})
