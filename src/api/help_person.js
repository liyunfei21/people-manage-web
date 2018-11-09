import request from '@/utils/request'

// 获取帮扶人列表
export const getHelpPersons = data => request({ url: '/manage/getHelpPersonList', method: 'post', data: data })
// 获取被帮扶人列表
export const getHelpedPersons = data => request({ url: '/manage/getHelpedPersonInfoList', method: 'post', data: data })
// 签到管理
export const getHelpSigns = data => request({ url: '/manage/getSignInfoList', method: 'post', data: data })
// 签到详情
export const getHelpSignInfoList = data => request({ url: '/manage/getSignInfoDetialList', method: 'post', data: data })
