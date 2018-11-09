import Cookies from 'js-cookie'

const app = {
  state: {
    language: Cookies.get('language') || 'zh',
    themeValue: Cookies.get('themeValue') || 'purple'
  },
  mutations: {
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    SET_THEME_VALUE: (state, themeValue) => {
      state.themeValue = themeValue
      Cookies.set('themeValue', themeValue)
    }
  },
  actions: {
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    setThemeValue({ commit }, themValue) {
      commit('SET_THEME_VALUE', themValue)
    }
  }
}

export default app
