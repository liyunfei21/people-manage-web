import request from '@/utils/request'

export function test(data) {
  const url = '/poorHouseholdInfo/getPoorHouseholdInfoList'
  const method = 'post'
  return request({ url: url, method: method, data: data })
}

export function family_basic_info_list(data) {
  const url = '/poorHouseholdInfo/getPoorHouseholdInfoList'
  const method = 'post'
  return request({ url: url, method: method, data: data })
}
