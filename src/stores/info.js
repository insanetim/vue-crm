import { get, getDatabase, ref, update } from 'firebase/database'
import { defineStore } from 'pinia'

import { useAppStore } from './app'
import { useAuthStore } from './auth'

export const useInfoStore = defineStore('info', {
  actions: {
    clearInfo() {
      this.info = {}
    },
    async fetchInfo() {
      try {
        const db = getDatabase()
        const authStore = useAuthStore()
        const uid = authStore.getUid()
        const data = await get(ref(db, `/users/${uid}/info`))
        this.info = data.val()
      } catch (e) {
        const appStore = useAppStore()
        appStore.setError(e)
        throw e
      }
    },
    async updateInfo(toUpdate) {
      try {
        const db = getDatabase()
        const authStore = useAuthStore()
        const uid = authStore.getUid()
        await update(ref(db, `/users/${uid}/info`), toUpdate)
        this.info = { ...this.info, ...toUpdate }
      } catch (e) {
        const appStore = useAppStore()
        appStore.setError(e)
        throw e
      }
    }
  },
  getters: {
    bill: state => state.info?.bill,
    locale: state => state.info?.locale
  },
  state: () => ({
    info: {}
  })
})
