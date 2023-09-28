import { child, get, getDatabase, onValue, push, ref } from 'firebase/database'

export default {
  actions: {
    async createRecord({ commit, dispatch }, record) {
      try {
        const db = getDatabase()
        const uid = await dispatch('auth/getUid', null, { root: true })
        await push(ref(db, `/users/${uid}/records`), record)
      } catch (e) {
        commit('setError', e, { root: true })
        throw e
      }
    },
    async fetchRecordById({ commit, dispatch }, id) {
      try {
        const db = getDatabase()
        const uid = await dispatch('auth/getUid', null, { root: true })
        const record = (await get(child(ref(db, `/users/${uid}/records`), id))).val()

        return { id, ...record }
      } catch (e) {
        commit('setError', e, { root: true })
        throw e
      }
    },
    async fetchRecords({ commit, dispatch, state }) {
      try {
        const db = getDatabase()
        const uid = await dispatch('auth/getUid', null, { root: true })
        onValue(ref(db, `/users/${uid}/records`), snapshot => {
          const records = snapshot.val() || {}
          commit(
            'setRecords',
            Object.keys(records).map(id => ({
              id,
              ...records[id]
            }))
          )
          if (!state.recordsReady) {
            commit('setRecordsReady')
          }
        })
      } catch (e) {
        commit('setError', e, { root: true })
        throw e
      }
    }
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
  namespaced: true,
  state: {
    records: [],
    recordsReady: false
  }
}
