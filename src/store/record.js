import { getDatabase, ref, push } from 'firebase/database'

export default {
  actions: {
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
