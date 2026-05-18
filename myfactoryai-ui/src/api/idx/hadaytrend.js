import request from '@/utils/request'

// 查询日现列表
export function listHadaytrend(query) {
  return request({
    url: '/idx/hadaytrend/list',
    method: 'get',
    params: query
  })
}

// 查询日现详细
export function getHadaytrend(id) {
  return request({
    url: '/idx/hadaytrend/' + id,
    method: 'get'
  })
}

// 新增日现
export function addHadaytrend(data) {
  return request({
    url: '/idx/hadaytrend',
    method: 'post',
    data: data
  })
}

// 修改日现
export function updateHadaytrend(data) {
  return request({
    url: '/idx/hadaytrend',
    method: 'put',
    data: data
  })
}

// 删除日现
export function delHadaytrend(id) {
  return request({
    url: '/idx/hadaytrend/' + id,
    method: 'delete'
  })
}
