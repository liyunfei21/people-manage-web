export function buildResponse(data) {
  const resp = {
    'code': 200,
    'message': '请求成功',
    'success': true
  }
  resp['data'] = data
  return resp
}
