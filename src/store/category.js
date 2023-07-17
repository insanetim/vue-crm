import { getDatabase, ref, child, push, onValue, update } from 'firebase/database'

export default {
  state: {
    categories: []
  },
  getters: {
    categories: s => s.categories
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories
    }
  },
  actions: {
    async fetchCategories({ commit, dispatch }) {
      try {
        const db = getDatabase()
        const uid = await dispatch('getUid')
        onValue(ref(db, `/users/${uid}/categories`), snapshot => {
          const categories = snapshot.val() || {}
          commit(
            'setCategories',
            Object.keys(categories).map(key => ({
              id: key,
              ...categories[key]
            }))
          )
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const db = getDatabase()
        const uid = await dispatch('getUid')
        push(ref(db, `/users/${uid}/categories`), { title, limit })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategory({ commit, dispatch }, { id, title, limit }) {
      try {
        const db = getDatabase()
        const uid = await dispatch('getUid')
        update(child(ref(db, `/users/${uid}/categories`), id), { title, limit })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
