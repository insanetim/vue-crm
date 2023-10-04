import { createLogger, createStore } from 'vuex'

import { currencies } from '../constants'
import auth from './modules/auth'
import category from './modules/category'
import info from './modules/info'
import record from './modules/record'

const plugins = []
if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger())
}

const store = createStore({
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
    }
  },
  getters: {
    error: s => s.error
  },
  modules: { auth, category, info, record },
  mutations: {
    clearError(state) {
      state.error = null
    },
    setError(state, error) {
      state.error = error
    }
  },
  plugins,
  state: () => ({
    error: null
  })
})

export default store
