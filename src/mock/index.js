import Mock from 'mockjs'
import loginAPI from './login'
import dict from './dict'
import family from './family_basic'
import info from './info_attr'
import help_person from './help_person'
import policys from './policys'
import effect from './effect'
import sys from './sys'

Mock.setup({
  timeout: '350-600'
})

// 登录相关
Mock.mock(/\/user\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/user\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/getUserInfo\.*/, 'post', loginAPI.getUserInfo)

// 字典
Mock.mock(/\/statistics\/getDictionaryInfoList/, 'post', dict.getDictionaryInfoList)
Mock.mock(/\/statistics\/getAreaInfoList/, 'post', dict.getAreaInfoList)

// 家庭信息列表
Mock.mock(/\/poorHouseholdInfo\/test/, 'post', family.getFamilyBasicInfoList)
Mock.mock(/\/poorHouseholdInfo\/getPoorHouseholdInfoList/, 'post', family.getFamilyBasicInfoList2)

// 家庭信息详情
Mock.mock(/\/poorHouseholdInfo\/getPoorHouseholdDetailedInfo/, 'post', info.getPoorHouseholdDetailedInfo())

// 帮扶责任人列表
Mock.mock(/\/manage\/getHelpPersonList/, 'post', help_person.getPersons)
Mock.mock(/\/manage\/getHelpedPersonInfoList/, 'post', help_person.getHelpedPersonList)
Mock.mock(/\/manage\/getHelpSigns/, 'post', help_person.getHelpSigns)

// 帮扶政策
Mock.mock(/\/policy\/getPolicyInfo/, 'post', policys.getPolicyInfo)

// 帮扶成效
Mock.mock(/\/outPovertyEffect\/getOutPovertyEffectList/, 'post', effect.getEffects)
Mock.mock(/\/outPovertyEffect\/viewOutPovertyData/, 'post', effect.viewOutPovertyData)

// 账户
Mock.mock(/\/user\/getUserList/, 'post', sys.getUserList)
Mock.mock(/\/test/, 'get', { test: 1 })

export default Mock
