const getters = {
  language: state => state.app.language,
  themeValue: state => state.app.themeValue,
  token: state => state.user.token,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  website: state => state.common.website,
  listPagePars: state => state.common.listPagePars,
  roles: state => state.user.roles
}
export default getters
