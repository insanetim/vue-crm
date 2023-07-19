import { getDatabase, ref, child, push, onValue, update, get } from 'firebase/database'

export default {
  state: {
    categories: [],
    categoriesReady: false
  },
  getters: {
    categories: s => s.categories,
    categoriesReady: s => s.categoriesReady
  },
  mutations: {
    setCategories(state, categories) {
      state.categories = categories
    },
    setCategoriesReady(state) {
      state.categoriesReady = true
    }
  },
  actions: {
    async fetchCategories({ commit, dispatch, state }) {
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
          if (!state.categoriesReady) {
            commit('setCategoriesReady')
          }
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategoryById({ commit, dispatch }, id) {
      try {
        const db = getDatabase()
        const uid = await dispatch('getUid')
        const category = (await get(child(ref(db, `/users/${uid}/categories`), id))).val()

        return { id, ...category }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const db = getDatabase()
        const uid = await dispatch('getUid')
        await push(ref(db, `/users/${uid}/categories`), { title, limit })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategory({ commit, dispatch }, { id, title, limit }) {
      try {
        const db = getDatabase()
        const uid = await dispatch('getUid')
        await update(child(ref(db, `/users/${uid}/categories`), id), { title, limit })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
