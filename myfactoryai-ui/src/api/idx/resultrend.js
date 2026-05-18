import request from '@/utils/request'

// 查询质异结果列表
export function listResultrend(query) {
  return request({
    url: '/idx/resultrend/list',
    method: 'get',
    params: query
  })
}

// 查询质异结果详细
export function getResultrend(id) {
  return request({
    url: '/idx/resultrend/' + id,
    method: 'get'
  })
}

// 新增质异结果
export function addResultrend(data) {
  return request({
    url: '/idx/resultrend',
    method: 'post',
    data: data
  })
}

// 修改质异结果
export function updateResultrend(data) {
  return request({
    url: '/idx/resultrend',
    method: 'put',
    data: data
  })
}

// 删除质异结果
export function delResultrend(id) {
  return request({
    url: '/idx/resultrend/' + id,
    method: 'delete'
  })
}
