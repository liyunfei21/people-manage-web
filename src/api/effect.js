import request from '@/utils/request'

export const getEffects = data => request({ url: '/outPovertyEffect/getOutPovertyEffectList', method: 'post', data: data })

// 审核资料上传
export const upload = (data, params) => request({ url: '/outPovertyEffect/upload', method: 'post', data, params, headers: { 'Content-Type': 'multipart/form-data' }})

// 查看审核资料
export const getMaterial = params => request({ url: '/outPovertyEffect/viewOutPovertyData', method: 'post', params: params })

// 下载文件
export const getFile = params => request({ url: '/outPovertyEffect/downloadFile', method: 'get', params: params, headers: { responseType: 'arraybuffer' }})
