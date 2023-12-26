import type { FirebaseError } from 'firebase/app'
import { defineStore } from 'pinia'

import type { UserRecord, RecordPersistent } from '@/types'
import {
  createUserRecord,
  getUserRecordById,
  getUserRecords,
} from '@/services/firebase'
import useErrorHandler from '@/composables/useErrorHandler'

type StateShape = {
  records: RecordPersistent[]
}

export const useRecordStore = defineStore('record', {
  state: (): StateShape => ({
    records: [],
  }),
  actions: {
    async createRecord(record: UserRecord) {
      try {
        const { key } = await createUserRecord(record)
        this.records.push({ id: key as string, ...record })
      } catch (error) {
        useErrorHandler(error as FirebaseError)
      }
    },
    async fetchRecords() {
      try {
        const records = (await getUserRecords()) ?? {}
        this.records = Object.keys(records).map(id => ({
          id,
          ...records[id],
        }))
      } catch (error) {
        useErrorHandler(error as FirebaseError)
      }
    },
    async fetchRecordById(id: string): Promise<RecordPersistent | void> {
      try {
        return await getUserRecordById(id)
      } catch (error) {
        useErrorHandler(error as FirebaseError)
      }
    },
  },
})
