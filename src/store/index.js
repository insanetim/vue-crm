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
      const key = process.env.VUE_APP_FIXER
      const res = await fetch(
        'http://data.fixer.io/api/latest?' +
          new URLSearchParams({
            access_key: key,
            symbols: currencies.join(',')
          })
      )
      return await res.json()
    }
  },
  modules: { auth, category, info, record }
})
