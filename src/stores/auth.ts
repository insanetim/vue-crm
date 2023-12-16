import type { FirebaseError } from 'firebase/app'
import { defineStore } from 'pinia'

import type { Credentials } from '@/types'
import { registerUser, loginUser, logoutUser } from '@/services/firebase'
import { useAppStore } from './app'
import { useInfoStore } from './info'

export const useAuthStore = defineStore('auth', {
  actions: {
    async login(credentials: Omit<Credentials, 'name'>) {
      try {
        await loginUser(credentials)
      } catch (e) {
        const appStore = useAppStore()
        appStore.setError(e as FirebaseError)
        throw e
      }
    },
    async logout() {
      const infoStore = useInfoStore()
      await logoutUser()
      infoStore.clearInfo()
    },
    async register(credentials: Credentials) {
      try {
        await registerUser(credentials)
      } catch (e) {
        const appStore = useAppStore()
        appStore.setError(e as FirebaseError)
        throw e
      }
    }
  }
})
