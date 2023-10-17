import type { FirebaseError } from 'firebase/app'
import { defineStore } from 'pinia'
import type { CurrenciesResponse } from '@/types'
import { currencies } from '@/constants'

type StateShape = {
  error: FirebaseError | null
}

export const useAppStore = defineStore('app', {
  state: (): StateShape => {
    return {
      error: null
    }
  },
  actions: {
    async fetchCurrency(): Promise<CurrenciesResponse> {
      const apiKey: string = import.meta.env.VITE_API_KEY
      const apiUrl: string = import.meta.env.VITE_API_URL
      const res = await fetch(
        `${apiUrl}/latest?${new URLSearchParams({
          base: 'USD',
          symbols: currencies.join(',')
        })}
          `,
        { headers: { apikey: apiKey } }
      )

      return await res.json()
    },
    setError(error: FirebaseError) {
      this.error = error
    }
  }
})
