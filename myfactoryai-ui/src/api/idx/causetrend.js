import request from '@/utils/request'

// 查询质异原因列表
export function listCausetrend(query) {
  return request({
    url: '/idx/causetrend/list',
    method: 'get',
    params: query
  })
}

// 查询质异原因详细
export function getCausetrend(id) {
  return request({
    url: '/idx/causetrend/' + id,
    method: 'get'
  })
}

// 新增质异原因
export function addCausetrend(data) {
  return request({
    url: '/idx/causetrend',
    method: 'post',
    data: data
  })
}

// 修改质异原因
export function updateCausetrend(data) {
  return request({
    url: '/idx/causetrend',
    method: 'put',
    data: data
  })
}

// 删除质异原因
export function delCausetrend(id) {
  return request({
    url: '/idx/causetrend/' + id,
    method: 'delete'
  })
}
