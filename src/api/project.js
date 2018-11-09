import request from '@/utils/request'

export function get(params) {
  return request({
    url: '/helpPoorPro/getHelpPoorProList',
    method: 'post',
    data: params
  })
}

export function create(params) {
  return request({
    url: '/helpPoorPro/addPolicy',
    method: 'post',
    data: params
  })
}

export function modify(params) {
  return request({
    url: '/helpPoorPro/updatePolicy',
    method: 'post',
    data: params
  })
}

export function remove(params) {
  return request({
    url: '/helpPoorPro/removePolicy',
    method: 'post',
    data: params
  })
}

export function getProgress(params) {
  return request({
    url: '/helpPoorPro/getProjectFundProgressList',
    method: 'post',
    data: params
  })
}
export function modifyProgress(params) {
  return request({
    url: '/helpPoorPro/updateProFundProgress',
    method: 'PUT',
    data: params
  })
}
// 获取项目受益人列表
export const getBeneficiaryList = data => request({ url: '/helpPoorPro/getHelpPoorProFamilyInfo', method: 'POST', data: data })
