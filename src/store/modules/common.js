import website from '@/const/website'
const common = {

  state: {
    website: website,
    listPagePars: new Map()
  },
  actions: {
    saveListPagePars: ({ commit }, { path, pars }) => {
      commit('SAVE_LIST_PAGE_PARS', { path, pars })
    }
  },
  mutations: {
    SAVE_LIST_PAGE_PARS: (state, { path, pars }) => {
      state.listPagePars.set(path, pars)
    }
  }
}
export default common
