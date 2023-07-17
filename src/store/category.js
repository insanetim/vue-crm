import { getDatabase, ref, child, push, update } from 'firebase/database'

export default {
  actions: {
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const db = getDatabase()
        const uid = await dispatch('getUid')
        const newCategoryKey = push(child(ref(db), `/users/${uid}/categories`), { title, limit }).key

        return { title, limit, id: newCategoryKey }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
