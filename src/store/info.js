import { getDatabase, ref, get, update } from 'firebase/database'

export default {
  state: {
    info: {}
  },
  getters: {
    info: s => s.info
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    }
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const db = getDatabase()
        const uid = await dispatch('getUid')
        const info = await get(ref(db, `/users/${uid}/info`))
        commit('setInfo', info.val())
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateInfo({ commit, dispatch, state }, toUpdate) {
      try {
        const db = getDatabase()
        const uid = await dispatch('getUid')
        await update(ref(db, `/users/${uid}/info`), toUpdate)
        commit('setInfo', { ...state.info, ...toUpdate })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
