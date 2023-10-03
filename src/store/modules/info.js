import { get, getDatabase, ref, update } from 'firebase/database'

export default {
  actions: {
    async fetchInfo({ commit, dispatch }) {
      try {
        const db = getDatabase()
        const uid = await dispatch('auth/getUid', null, { root: true })
        const info = await get(ref(db, `/users/${uid}/info`))
        commit('setInfo', info.val())
      } catch (e) {
        commit('setError', e, { root: true })
        throw e
      }
    },
    async updateInfo({ commit, dispatch, state }, toUpdate) {
      try {
        const db = getDatabase()
        const uid = await dispatch('auth/getUid', null, { root: true })
        await update(ref(db, `/users/${uid}/info`), toUpdate)
        commit('setInfo', { ...state.info, ...toUpdate })
      } catch (e) {
        commit('setError', e, { root: true })
        throw e
      }
    }
  },
  getters: {
    info: s => s.info
  },
  mutations: {
    clearInfo(state) {
      state.info = {}
    },
    setInfo(state, info) {
      state.info = info
    }
  },
  namespaced: true,
  state: () => ({
    info: {}
  })
}
