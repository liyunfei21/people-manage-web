import request from '@/utils/request'

export async function getDictByType(type) {
  const requests = { requestId: '' }
  requests['type'] = type
  return request({ url: '/statistics/getDictionaryInfoList', method: 'post', data: requests })
}

export function getAreaDictByType(type, pid = 0) {
  let typeId = -1
  switch (type) {
    case 'town':
      typeId = pid
      break
    case 'village':
      typeId = pid
      break
    case 'group':
      typeId = pid
      break
  }
  const url = '/statistics/getAreaInfoList'
  const method = 'post'
  const requests = { requestId: '' }
  requests['areaId'] = typeId
  requests['type'] = type
  return request({ url: url, method: method, data: requests })
}

export function getAdministrationUnit(data) {
  return request({ url: '/manage/getUnitsByArea', method: 'post', data: data })
  // const result = {
  //   code: 200,
  //   data: [
  //     { areaId: 1, list: [{ id: 1, name: '大垭村' }, { id: 2, name: '小树村' }, { id: 3, name: '黑风寨' }] }
  //   ]
  // }
  // return result
}
