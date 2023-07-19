import { getDatabase, ref, push, onValue, child, get } from 'firebase/database'

export default {
  state: {
    records: [],
    recordsReady: false
  },
  getters: {
    records: s => s.records,
    recordsReady: s => s.recordsReady
  },
  mutations: {
    setRecords(state, records) {
      state.records = records
    },
    setRecordsReady(state) {
      state.recordsReady = true
    }
  },
  actions: {
    async fetchRecords({ commit, dispatch, state }) {
      try {
        const db = getDatabase()
        const uid = await dispatch('getUid')
        onValue(ref(db, `/users/${uid}/records`), snapshot => {
          const records = snapshot.val() || {}
          commit(
            'setRecords',
            Object.keys(records).map(key => ({
              id: key,
              ...records[key]
            }))
          )
          if (!state.recordsReady) {
            commit('setRecordsReady')
          }
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecordById({ commit, dispatch }, id) {
      try {
        const db = getDatabase()
        const uid = await dispatch('getUid')
        const record = (await get(child(ref(db, `/users/${uid}/records`), id))).val()

        return { id, ...record }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createRecord({ commit, dispatch }, record) {
      try {
        const db = getDatabase()
        const uid = await dispatch('getUid')
        await push(ref(db, `/users/${uid}/records`), record)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
