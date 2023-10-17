import type { FirebaseError } from 'firebase/app'
import { get, getDatabase, ref, update } from 'firebase/database'
import { defineStore } from 'pinia'

import type { UserInfo } from '@/types'
import { useAppStore } from './app'
import { useAuthStore } from './auth'

type StateShape = {
  info: UserInfo | null
}

export const useInfoStore = defineStore('info', {
  state: (): StateShape => ({
    info: null
  }),
  getters: {
    bill: state => state.info?.bill,
    locale: state => state.info?.locale
  },
  actions: {
    clearInfo() {
      this.info = null
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
        appStore.setError(e as FirebaseError)
        throw e
      }
    },
    async updateInfo(toUpdate: Partial<UserInfo>) {
      try {
        const db = getDatabase()
        const authStore = useAuthStore()
        const uid = authStore.getUid()
        await update(ref(db, `/users/${uid}/info`), toUpdate)
        this.info = { ...this.info, ...toUpdate } as UserInfo
      } catch (e) {
        const appStore = useAppStore()
        appStore.setError(e as FirebaseError)
        throw e
      }
    }
  }
})
