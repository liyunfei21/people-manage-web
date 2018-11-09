import Mock from 'mockjs'

const list = []
const total = 60
for (let i = 0; i < total; i++) {
  list.push(Mock.mock({
    familyYearStateId: '@increment',
    householdNumber: '@integer(4000, 500000000)',
    householderName: '@cname()',
    id: '@increment',
    perCapitaNetIncome: '@increment',
    'town': Mock.Random.region(),
    village: Mock.Random.cword(3),
    'status|1': [0, 1],
    'whetherDrinkingWaterDifficult|1': [true, false],
    'whetherDrinkingWaterSafety|1': [true, false],
    'whetherDropout|1': [true, false],
    'whetherMajorIllness|1': [true, false]
  }))
}

const result = {
  code: 200,
  data: {
    list: list,
    total: total
  }
}

export default{
  getEffects(params) {
    const { from, size } = params
    const start = from === 0 ? 0 : from - size
    const end = from === 0 ? size : from
    result.data.list = list.slice(start, end)
    return result
  },
  viewOutPovertyData() {
    return result
  }
}
