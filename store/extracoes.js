export const state = () => ({
  listaExtracoes: null
})

export const getters = {
  getExtracoes (state) {
    return state.listaExtracoes
  }
}

export const mutations = {
  setExtracoes (state, payload) {
    state.listaExtracoes = { ...payload }
  }
}

export const actions = {
  adicionarExtracoes ({ commit }, payload) {
    commit('setExtracoes', payload)
  }
}
