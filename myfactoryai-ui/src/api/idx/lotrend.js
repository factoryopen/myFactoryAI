import request from '@/utils/request'

// 查询批次现列表
export function listLotrend(query) {
  return request({
    url: '/idx/lotrend/list',
    method: 'get',
    params: query
  })
}

// 查询批次现详细
export function getLotrend(id) {
  return request({
    url: '/idx/lotrend/' + id,
    method: 'get'
  })
}

// 新增批次现
export function addLotrend(data) {
  return request({
    url: '/idx/lotrend',
    method: 'post',
    data: data
  })
}

// 修改批次现
export function updateLotrend(data) {
  return request({
    url: '/idx/lotrend',
    method: 'put',
    data: data
  })
}

// 删除批次现
export function delLotrend(id) {
  return request({
    url: '/idx/lotrend/' + id,
    method: 'delete'
  })
}
