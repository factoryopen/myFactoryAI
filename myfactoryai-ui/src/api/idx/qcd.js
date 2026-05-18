import request from '@/utils/request'

// 查询QCD列表
export function listQcd(query) {
  return request({
    url: '/idx/qcd/list',
    method: 'get',
    params: query
  })
}

// 查询QCD详细
export function getQcd(id) {
  return request({
    url: '/idx/qcd/' + id,
    method: 'get'
  })
}

// 新增QCD
export function addQcd(data) {
  return request({
    url: '/idx/qcd',
    method: 'post',
    data: data
  })
}

// 修改QCD
export function updateQcd(data) {
  return request({
    url: '/idx/qcd',
    method: 'put',
    data: data
  })
}

// 删除QCD
export function delQcd(id) {
  return request({
    url: '/idx/qcd/' + id,
    method: 'delete'
  })
}
