import request from '@/utils/request'

// 查询存货现列表
export function listInventory(query) {
  return request({
    url: '/idx/inventory/list',
    method: 'get',
    params: query
  })
}

// 查询存货现详细
export function getInventory(id) {
  return request({
    url: '/idx/inventory/' + id,
    method: 'get'
  })
}

// 新增存货现
export function addInventory(data) {
  return request({
    url: '/idx/inventory',
    method: 'post',
    data: data
  })
}

// 修改存货现
export function updateInventory(data) {
  return request({
    url: '/idx/inventory',
    method: 'put',
    data: data
  })
}

// 删除存货现
export function delInventory(id) {
  return request({
    url: '/idx/inventory/' + id,
    method: 'delete'
  })
}
