import { buildResponse } from './common'

const dictList = {
  year: [{
    'id': 242,
    'name': '2013',
    'type': 'year',
    'typeName': '年份'
  },
  {
    'id': 243,
    'name': '2014',
    'type': 'year',
    'typeName': '年份'
  },
  {
    'id': 244,
    'name': '2015',
    'type': 'year',
    'typeName': '年份'
  }
  ],
  town: [{
    areaId: 1,
    areaName: '兴隆镇'
  },
  {
    areaId: 2,
    areaName: '兴隆镇'
  },
  {
    areaId: 3,
    areaName: '兴隆镇'
  },
  {
    areaId: 4,
    areaName: '兴隆镇'
  }
  ],
  'village': [{
    areaId: 1,
    areaName: '草坪村'
  },
  {
    areaId: 2,
    areaName: '草坪村'
  },
  {
    areaId: 3,
    areaName: '草坪村'
  },
  {
    areaId: 4,
    areaName: '草坪村'
  },
  {
    areaId: 5,
    areaName: '草坪村'
  }
  ],
  'group': [{
    areaId: 1,
    areaName: '一组'
  },
  {
    areaId: 1,
    areaName: '一组'
  },
  {
    areaId: 1,
    areaName: '一组'
  },
  {
    areaId: 1,
    areaName: '一组'
  },
  {
    areaId: 1,
    areaName: '一组'
  }
  ],
  'out_poverty_state': [{
    id: 1,
    name: '未脱贫'
  },
  {
    id: 2,
    name: '已脱贫（享受政策）'
  },
  {
    id: 3,
    name: '返贫'
  }
  ],
  'poor_family_property': [{
    id: 1,
    name: '一般贫困户'
  },
  {
    id: 2,
    name: '低保户'
  },
  {
    id: 3,
    name: '五保户'
  }
  ],
  'main_poor_causes': [{
    id: 1,
    name: '因病'
  },
  {
    id: 2,
    name: '因残'
  },
  {
    id: 3,
    name: '因学'
  },
  {
    id: 4,
    name: '其他'
  }
  ],
  'policy_type': [{
    id: 1,
    name: '教育补贴'
  },
  {
    id: 2,
    name: '医疗补贴'
  },
  {
    id: 3,
    name: '保险补贴'
  },
  {
    id: 4,
    name: '危房改造'
  }
  ],
  'external_buy_car': [{
    id: 1,
    name: '车产'
  },
  {
    id: 2,
    name: '商品房'
  },
  {
    id: 3,
    name: '企业商铺'
  },
  {
    id: 4,
    name: '财政供养人员'
  }
  ]
}

export default {
  getDictionaryInfoList: config => {
    const { type } = JSON.parse(config.body)
    return buildResponse(dictList[type])
  },
  getAreaInfoList(config) {
    const { type, areaId } = JSON.parse(config.body)
    if (areaId === null) {
      return buildResponse([])
    }
    return buildResponse(dictList[type])
  }
}

