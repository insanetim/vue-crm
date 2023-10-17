import type { FirebaseError } from 'firebase/app'
import { child, get, getDatabase, onValue, push, ref } from 'firebase/database'
import { defineStore } from 'pinia'

import type { UserRecord, RecordPersistent } from '@/types'
import { useAppStore } from './app'
import { useAuthStore } from './auth'

type StateShape = {
  records: RecordPersistent[]
}

export const useRecordStore = defineStore('record', {
  state: (): StateShape => ({
    records: []
  }),
  actions: {
    async createRecord(record: UserRecord) {
      try {
        const db = getDatabase()
        const authStore = useAuthStore()
        const uid = authStore.getUid()
        await push(ref(db, `/users/${uid}/records`), record)
      } catch (e) {
        const appStore = useAppStore()
        appStore.setError(e as FirebaseError)
        throw e
      }
    },
    async fetchRecordById(id: string): Promise<RecordPersistent> {
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
        appStore.setError(e as FirebaseError)
        throw e
      }
    },
    fetchRecords() {
      return new Promise<void>(resolve => {
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
            appStore.setError(e as FirebaseError)
            throw e
          }
        })()
      })
    }
  }
})
