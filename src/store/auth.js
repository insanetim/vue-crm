import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database'

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async register({ commit, dispatch }, { email, password, name }) {
      try {
        const auth = getAuth()
        await createUserWithEmailAndPassword(auth, email, password)
        const uid = await dispatch('getUid')
        const db = getDatabase()
        await set(ref(db, `/users/${uid}/info`), {
          bill: 100000,
          name
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    getUid() {
      const user = getAuth().currentUser

      return user ? user.uid : null
    },
    async login({ commit }, { email, password }) {
      try {
        const auth = getAuth()
        await signInWithEmailAndPassword(auth, email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async logout({ commit }) {
      const auth = getAuth()
      await signOut(auth)
      commit('clearInfo')
    }
  }
}
