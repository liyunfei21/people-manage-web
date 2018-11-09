import request from '@/utils/request'

const basic_request = { 'requestId': '' }

export function login(account, password, code) {
  return request({
    url: '/user/verifyLogin',
    method: 'post',
    data: {
      account,
      password,
      code
    }
  })
}

export function getInfo(token) {
  basic_request['token'] = token
  return request({
    url: '/user/getUserInfo',
    method: 'post',
    data: basic_request
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post',
    data: basic_request
  })
}
