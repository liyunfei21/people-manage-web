import request from '@/utils/request'

export function getPolicys(from, size, typeId, yearId, keyword) {
  const requests = { requestId: '' }
  requests['from'] = from
  requests['size'] = size
  requests['typeId'] = typeId
  requests['yearId'] = yearId
  requests['keyword'] = keyword
  const url = '/policy/getPolicyInfo'
  const method = 'post'
  return request({ url: url, method: method, data: requests })
}

export function create(params) {
  return request({
    url: '/policy/addPolicy',
    method: 'post',
    data: params
  })
}
export function getInfo(params) {
  return request({
    url: '/policy/getPolicyDetailInfo',
    method: 'post',
    data: params
  })
}

export function modify(params) {
  return request({
    url: '/policy/updatePolicy',
    method: 'PUT',
    data: params
  })
}

export function remove(params) {
  return request({
    url: '/policy/removePolicy',
    method: 'post',
    data: params
  })
}
