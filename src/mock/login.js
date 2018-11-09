import { param2Obj } from '@/utils'

const userMap = {
  '13011011592': { 'code': 200, 'data': { 'token': 'admin' }}
}

const infoMap = {
  '13011011592': {
    'code': 200,
    'data': {
      'roles': ['admin'],
      'token': 'admin',
      'profileUrl': 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      'name': 'Super Admin'
    }
  }
}

export default {
  loginByUsername: config => {
    const { account } = JSON.parse(config.body)
    if (userMap[account]) {
      return userMap[account]
    } else {
      return { 'code': 50000, 'message': '登录失败' }
    }
  },
  getUserInfo: config => {
    return infoMap['13011011592']
  },
  logout: () => {
    return { 'code': 200, 'data': {}}
  }
}
