import request from '@/utils/request'

export function info_attr(id) {
  const requests = { requestId: '' }
  requests['familyYearStateId'] = id
  const url = '/poorHouseholdInfo/getPoorHouseholdDetailedInfo'
  const method = 'post'
  return request({ url: url, method: method, data: requests })
}
