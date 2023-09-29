import {
  child,
  get,
  getDatabase,
  onValue,
  push,
  ref,
  update
} from 'firebase/database'

export default {
  actions: {
    async createCategory({ commit, dispatch }, { limit, title }) {
      try {
        const db = getDatabase()
        const uid = await dispatch('auth/getUid', null, { root: true })
        await push(ref(db, `/users/${uid}/categories`), { limit, title })
      } catch (e) {
        commit('setError', e, { root: true })
        throw e
      }
    },
    async fetchCategories({ commit, dispatch, state }) {
      try {
        const db = getDatabase()
        const uid = await dispatch('auth/getUid', null, { root: true })
        onValue(ref(db, `/users/${uid}/categories`), snapshot => {
          const categories = snapshot.val() || {}
          commit(
            'setCategories',
            Object.keys(categories).map(id => ({
              id,
              ...categories[id]
            }))
          )
          if (!state.categoriesReady) {
            commit('setCategoriesReady')
          }
        })
      } catch (e) {
        commit('setError', e, { root: true })
        throw e
      }
    },
    async fetchCategoryById({ commit, dispatch }, id) {
      try {
        const db = getDatabase()
        const uid = await dispatch('auth/getUid', null, { root: true })
        const category = (
          await get(child(ref(db, `/users/${uid}/categories`), id))
        ).val()

        return { id, ...category }
      } catch (e) {
        commit('setError', e, { root: true })
        throw e
      }
    },
    async updateCategory({ commit, dispatch }, { id, limit, title }) {
      try {
        const db = getDatabase()
        const uid = await dispatch('auth/getUid', null, { root: true })
        await update(child(ref(db, `/users/${uid}/categories`), id), {
          limit,
          title
        })
      } catch (e) {
        commit('setError', e, { root: true })
        throw e
      }
    }
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
  namespaced: true,
  state: {
    categories: [],
    categoriesReady: false
  }
}
