import { child, get, getDatabase, onValue, push, ref } from 'firebase/database'
import { defineStore } from 'pinia'

import { useAppStore } from './app'
import { useAuthStore } from './auth'

export const useRecordStore = defineStore('record', {
  actions: {
    async createRecord(record) {
      try {
        const db = getDatabase()
        const authStore = useAuthStore()
        const uid = authStore.getUid()
        await push(ref(db, `/users/${uid}/records`), record)
      } catch (e) {
        const appStore = useAppStore()
        appStore.setError(e)
        throw e
      }
    },
    async fetchRecordById(id) {
      try {
        const db = getDatabase()
        const authStore = useAuthStore()
        const uid = authStore.getUid()
        const record = (
          await get(child(ref(db, `/users/${uid}/records`), id))
        ).val()

        return { id, ...record }
      } catch (e) {
        const appStore = useAppStore()
        appStore.setError(e)
        throw e
      }
    },
    fetchRecords() {
      return new Promise(resolve => {
        ;(async () => {
          try {
            const db = getDatabase()
            const authStore = useAuthStore()
            const uid = authStore.getUid()
            onValue(ref(db, `/users/${uid}/records`), snapshot => {
              const records = snapshot.val() || {}
              this.records = Object.keys(records).map(id => ({
                id,
                ...records[id]
              }))
              resolve()
            })
          } catch (e) {
            const appStore = useAppStore()
            appStore.setError(e)
            throw e
          }
        })()
      })
    }
  },
  state: () => ({
    records: []
  })
})
