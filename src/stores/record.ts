import type { FirebaseError } from 'firebase/app'
import { defineStore } from 'pinia'

import type { UserRecord, RecordPersistent } from '@/types'
import { useAppStore } from './app'
import {
  createUserRecord,
  getUserRecordById,
  getUserRecords
} from '@/services/firebase'

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
        const { key } = await createUserRecord(record)
        this.records.push({ id: key as string, ...record })
      } catch (e) {
        const appStore = useAppStore()
        appStore.setError(e as FirebaseError)
        throw e
      }
    },
    async fetchRecords() {
      try {
        const records = (await getUserRecords()) ?? {}
        this.records = Object.keys(records).map(id => ({
          id,
          ...records[id]
        }))
      } catch (e) {
        const appStore = useAppStore()
        appStore.setError(e as FirebaseError)
        throw e
      }
    },
    async fetchRecordById(id: string): Promise<RecordPersistent> {
      try {
        return await getUserRecordById(id)
      } catch (e) {
        const appStore = useAppStore()
        appStore.setError(e as FirebaseError)
        throw e
      }
    }
  }
})
