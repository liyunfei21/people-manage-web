import { buildResponse } from './common'

const poorHouseholdInfoList = [
  { id: 1,
    src: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    holder_name: '王生',
    holder_number: 'XXXXXXXXXXXXX',
    member_number: '2人',
    telephone: 'XXXXXXXXXxxxXX',
    address: 'XXXXXXXXXXXXX',
    primary_reason: '因病',
    second_reason: '因灾',
    property: '低保户',
    dangerous_building: '否',
    financial_situation: '车产 房产 企业法人 财政供养',
    help_policy: '教育补贴 医疗补贴 保险补贴 危房改造'
  },
  {
    id: 2,
    src: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    holder_name: '李生',
    holder_number: 'XXXXXXXXXXXXX',
    member_number: '2人',
    telephone: 'XXXXXXXXXxxxXX',
    address: 'XXXXXXXXXXXXX',
    primary_reason: '因病',
    second_reason: '因灾',
    property: '低保户',
    dangerous_building: '否',
    financial_situation: '车产、房产、企业法人、财政供养',
    help_policy: '教育补贴 医疗补贴 保险补贴 危房改造'
  }, {
    id: 3,
    src: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    holder_name: 'peat张',
    holder_number: 'XXXXXXXXXXXXX',
    member_number: '2人',
    telephone: 'XXXXXXXXXxxxXX',
    address: 'XXXXXXXXXXXXX',
    primary_reason: '因病',
    second_reason: '因灾',
    property: '低保户',
    dangerous_building: '否',
    financial_situation: '车产、房产、企业法人、财政供养',
    help_policy: '教育补贴 医疗补贴 保险补贴 危房改造'
  }, {
    id: 4,
    src: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    holder_name: 'Madam',
    holder_number: 'XXXXXXXXXXXXX',
    member_number: '2人',
    telephone: 'XXXXXXXXXxxxXX',
    address: 'XXXXXXXXXXXXX',
    primary_reason: '因病',
    second_reason: '因灾',
    property: '低保户',
    dangerous_building: '否',
    financial_situation: '车产、房产、企业法人、财政供养',
    help_policy: '教育补贴 医疗补贴 保险补贴 危房改造'
  }
]

const info_list = {
  'code': 200,
  'data': {
    'list': [
      {
        'bank': 'string',
        'bankCardNumber': 'string',
        'familyPopulationNum': 'string',
        'financialSituation': {
          292: false,
          293: true,
          294: false, 295: true
        },
        'helpPolicy': {
          288: true,
          289: true,
          290: true, 291: true
        },
        familyOutPoorState: '已脱贫',
        'homeAddress': 'string',
        'householdNumber': 'string',
        'householderName': 'string',
        'mainCauseOfPoverty': 'string',
        'phoneNumber': 'string',
        'poorHouseholdProperty': 'string',
        'reasonsForReturningToPoverty': [
          'string'
        ],
        'score': 0,
        'secondaryCausesOfPoverty': [
          '原因1',
          '原因2',
          '原因3'
        ],
        'whetherDangerousHouse': 'string',
        'whetherMilitaryGenus': 'string',
        'familyYearStateId': 0,
        'avatar': 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
      },
      {
        'bank': 'string',
        'bankCardNumber': 'string',
        'familyPopulationNum': 'string',
        'financialSituation': {
          292: true,
          289: true,
          290: true, 295: true
        },
        'helpPolicy': {
          288: true,
          222: true,
          290: true, 291: true
        },
        'homeAddress': 'string',
        'householdNumber': 'xxxxx',
        'householderName': 'xxx',
        'mainCauseOfPoverty': 'string',
        'phoneNumber': 'string',
        'poorHouseholdProperty': 'string',
        'reasonsForReturningToPoverty': [
          'string'
        ],
        'score': 0,
        'secondaryCausesOfPoverty': [
          'string'
        ],
        'whetherDangerousHouse': 'string',
        'whetherMilitaryGenus': 'string',
        'avatar': 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
      },
      {
        'bank': 'string',
        'bankCardNumber': 'string',
        'familyPopulationNum': 'string',
        'financialSituation': {
          288: true,
          289: true,
          290: true, 291: true
        },
        'helpPolicy': {
          288: true,
          289: true,
          290: true, 291: true
        },
        'homeAddress': 'string',
        'householdNumber': 'string',
        'householderName': 'Madam',
        'mainCauseOfPoverty': 'string',
        'phoneNumber': 'string',
        'poorHouseholdProperty': 'string',
        'reasonsForReturningToPoverty': [
          'string'
        ],
        'score': 0,
        'secondaryCausesOfPoverty': [
          'string'
        ],
        'whetherDangerousHouse': 'string',
        'whetherMilitaryGenus': 'string',
        'familyYearStateId': 0,
        'avatar': 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
      },
      {
        'bank': 'string',
        'bankCardNumber': 'string',
        'familyPopulationNum': 'string',
        'financialSituation': {
          291: true,
          289: true,
          290: true, 295: true
        },
        'helpPolicy': {
          288: false,
          289: false,
          291: true
        },
        'homeAddress': 'string',
        'householdNumber': 'string',
        'householderName': 'Madam',
        'mainCauseOfPoverty': 'string',
        'phoneNumber': 'string',
        'poorHouseholdProperty': 'string',
        'reasonsForReturningToPoverty': [
          'string'
        ],
        'score': 0,
        'secondaryCausesOfPoverty': [
          'string'
        ],
        'whetherDangerousHouse': 'string',
        'whetherMilitaryGenus': 'string',
        'familyYearStateId': 0,
        'avatar': 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
      }
    ],
    'total': 4
  },
  'message': 'string',
  'requestId': 'string',
  'success': true
}

export default {
  getFamilyBasicInfoList(config) {
    const { search } = JSON.parse(config.body)
    let list = poorHouseholdInfoList
    if (search) {
      list = poorHouseholdInfoList.filter(o => o.holder_name === search)
    }
    const data = { list: list, total: list.length }
    return buildResponse(data)
  },
  getFamilyBasicInfoList2() {
    return info_list
  }
}
