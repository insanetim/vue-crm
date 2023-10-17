import type { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database'
import { defineStore } from 'pinia'

import type { Credentials } from '@/types'
import { useAppStore } from './app'
import { useInfoStore } from './info'

export const useAuthStore = defineStore('auth', {
  actions: {
    getUid() {
      const user = getAuth().currentUser

      return user ? user.uid : null
    },
    async login({ email, password }: Omit<Credentials, 'name'>) {
      try {
        const auth = getAuth()
        await signInWithEmailAndPassword(auth, email, password)
      } catch (e) {
        const appStore = useAppStore()
        appStore.setError(e as FirebaseError)
        throw e
      }
    },
    async logout() {
      const auth = getAuth()
      await signOut(auth)
      const infoStore = useInfoStore()
      infoStore.clearInfo()
    },
    async register({ email, name, password }: Credentials) {
      try {
        const auth = getAuth()
        await createUserWithEmailAndPassword(auth, email, password)
        const db = getDatabase()
        const uid = this.getUid()
        await set(ref(db, `/users/${uid}/info`), {
          bill: 100000,
          locale: 'ru-RU',
          name
        })
      } catch (e) {
        const appStore = useAppStore()
        appStore.setError(e as FirebaseError)
        throw e
      }
    }
  }
})
