import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database'

export default {
  actions: {
    getUid() {
      const user = getAuth().currentUser

      return user ? user.uid : null
    },
    async login({ commit }, { email, password }) {
      try {
        const auth = getAuth()
        await signInWithEmailAndPassword(auth, email, password)
      } catch (e) {
        commit('setError', e, { root: true })
        throw e
      }
    },
    async logout({ commit }) {
      const auth = getAuth()
      await signOut(auth)
      commit('info/clearInfo', null, { root: true })
    },
    async register({ commit, dispatch }, { email, name, password }) {
      try {
        const auth = getAuth()
        await createUserWithEmailAndPassword(auth, email, password)
        const db = getDatabase()
        const uid = await dispatch('getUid')
        await set(ref(db, `/users/${uid}/info`), {
          bill: 100000,
          locale: 'ru-RU',
          name
        })
      } catch (e) {
        commit('setError', e, { root: true })
        throw e
      }
    }
  },
  namespaced: true
}
