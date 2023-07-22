import Vue from 'vue'
import Vuex from 'vuex'

import { currencies } from '@/constants'
import auth from './auth'
import category from './category'
import info from './info'
import record from './record'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  getters: {
    error: s => s.error
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    async fetchCurrency() {
      const apiKey = process.env.VUE_APP_KEY
      const apiUrl = process.env.VUE_APP_URL
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
  modules: { auth, category, info, record }
})
