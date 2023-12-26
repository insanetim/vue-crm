import type { FirebaseError } from 'firebase/app'
import { defineStore } from 'pinia'

import type { UserInfo } from '@/types'
import { getUserInfo, updateUserInfo } from '@/services/firebase'
import useErrorHandler from '@/composables/useErrorHandler'

type StateShape = {
  info: UserInfo | null
}

export const useInfoStore = defineStore('info', {
  state: (): StateShape => ({
    info: null,
  }),
  getters: {
    bill: state => state.info?.bill,
    locale: state => state.info?.locale,
  },
  actions: {
    clearInfo() {
      this.info = null
    },
    async fetchInfo() {
      try {
        this.info = await getUserInfo()
      } catch (error) {
        useErrorHandler(error as FirebaseError)
      }
    },
    async updateInfo(toUpdate: Partial<UserInfo>) {
      try {
        await updateUserInfo(toUpdate)
        this.info = { ...this.info, ...toUpdate } as UserInfo
      } catch (error) {
        useErrorHandler(error as FirebaseError)
      }
    },
  },
})
