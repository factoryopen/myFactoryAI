import request from '@/utils/request'

// 查询质异日势列表
export function listHqdaytrend(query) {
  return request({
    url: '/idx/hqdaytrend/list',
    method: 'get',
    params: query
  })
}

// 查询质异日势详细
export function getHqdaytrend(id) {
  return request({
    url: '/idx/hqdaytrend/' + id,
    method: 'get'
  })
}

// 新增质异日势
export function addHqdaytrend(data) {
  return request({
    url: '/idx/hqdaytrend',
    method: 'post',
    data: data
  })
}

// 修改质异日势
export function updateHqdaytrend(data) {
  return request({
    url: '/idx/hqdaytrend',
    method: 'put',
    data: data
  })
}

// 删除质异日势
export function delHqdaytrend(id) {
  return request({
    url: '/idx/hqdaytrend/' + id,
    method: 'delete'
  })
}
