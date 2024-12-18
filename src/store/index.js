import { createStore } from 'vuex'

const store = createStore({
  state: {
    toast: null
  },
  mutations: {
    setToast: (state, toast) => {
      state.toast = toast
    },
    deleteToast: (state) => {
      state.toast = null
    }
  },
  actions: {
    setToast: ({ commit }, toast) => {
      commit('setToast', toast)
      setTimeout(() => {
        commit('deleteToast')
      }, 5000)
    }
  }
})

export default store
