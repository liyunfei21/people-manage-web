import Mock from 'mockjs'
const result = {
  'code': 200,
  'data': {
    'list': [
      {
        'helpPersonId': 0,
        'helpPersonName': 'string',
        'helpedPersonNum': 0,
        'phone': 'string',
        'unitId': 0,
        'unitName': 'string'
      }
    ],
    'total': 0
  },
  'message': 'string',
  'requestId': 'string',
  'success': true
}

const helpedPesonResult = {
  'code': 200,
  'data': {
    'list': [
      {
        'helpedPersonId': 0,
        'helpedPersonName': 'string',
        'mainPoorCause': 'string',
        'poorFamilyPopulationNum': 'string',
        'poorFamilyProperty': 'string',
        'town': 'string',
        'village': 'string'
      }
    ],
    'total': 1
  },
  'message': 'string',
  'requestId': 'string',
  'success': true
}

const signs = []
const signs_total = 10
for (let i = 0; i < 10; i++) {
  signs.push(Mock.mock({
    helpPersonName: Mock.Random.cname(),
    signInTime: Mock.Random.date(),
    signNum: Mock.Random.natural(0, 200)
  }))
}
const helpSignsResult = {
  code: 200,
  data: {
    list: signs,
    total: signs_total
  }
}
export default {
  getPersons() {
    return result
  },
  getHelpedPersonList() {
    return helpedPesonResult
  },
  getHelpSigns() {
    return helpSignsResult
  }
}
