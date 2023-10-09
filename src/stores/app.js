import { currencies } from '@/constants'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  actions: {
    async fetchCurrency() {
      const apiKey = process.env.VUE_APP_API_KEY
      const apiUrl = process.env.VUE_APP_API_URL
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
    setError(error) {
      this.error = error
    }
  },
  state: () => {
    return {
      error: null
    }
  }
})
