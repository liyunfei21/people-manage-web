import request from '@/utils/request'

// 获取账户列表
export const getUserList = data => request({ url: '/user/getUserList', method: 'post', data: data })

// 修改密码
export const modifyPassword = data => request({ url: '/user/updatePassword', method: 'post', data: data })

// 重置密码
export const resetPassword = data => request({ url: '/user/resetUserPasswordInPC', method: 'post', data: data })

// 添加用户
export const addUser = data => request({ url: '/user/addUser', method: 'post', data: data })
