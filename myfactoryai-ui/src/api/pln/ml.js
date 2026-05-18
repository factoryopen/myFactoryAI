import request from '@/utils/request'

// 查询批次管理列表
export function listMl(query) {
    return request({
        url: '/pln/ml/list',
        method: 'get',
        params: query
    })
}

// 查询批次管理列表
export function listMlDraft(query) {
  return request({
    url: '/pln/ml/listDraft',
    method: 'get',
    params: query
  })
}

// 查询批次管理列表
export function listMlPublishing(query) {
  return request({
    url: '/pln/ml/listPublishing',
    method: 'get',
    params: query
  })
}

// 查询批次管理列表
export function listMlProcessing(query) {
  return request({
    url: '/pln/ml/listProcessing',
    method: 'get',
    params: query
  })
}

// 查询批次管理列表
export function listMlFinishing(query) {
  return request({
    url: '/pln/ml/listFinishing',
    method: 'get',
    params: query
  })
}

// 查询批次管理列表
export function listMlHistory(query) {
  return request({
    url: '/pln/ml/listHistory',
    method: 'get',
    params: query
  })
}

// 查询批次管理列表
export function listMlAll(query) {
  return request({
    url: '/pln/ml/listAll',
    method: 'get',
    params: query
  })
}

// 查询批次管理详细
export function getMl(id) {
    return request({
        url: '/pln/ml/' + id,
        method: 'get'
    })
}

// 新增批次管理
export function addMl(data) {
    return request({
        url: '/pln/ml',
        method: 'post',
        data: data
    })
}

// 修改批次管理
export function updateMl(data) {
    return request({
        url: '/pln/ml',
        method: 'put',
        data: data
    })
}

// 删除批次管理
export function delMl(id) {
    return request({
        url: '/pln/ml/' + id,
        method: 'delete'
    })
}

// 变更
export function changeMl(data)  {
    return request({
        url: '/pln/ml/changeMl',
        method: 'put',
        data: data
    })
}
// 冻结
export function frozeMl(id)  {
    return request({
        url: '/pln/ml/frozeMl/'+ id,
        method: 'put'
    })
}
// 停用
export function disableMl(id)  {
    return request({
        url: '/pln/ml/disableMl/'+ id,
        method: 'put'
    })
}

// 变更
export function change(data)  {
    return request({
        url: '/pln/ml/change',
        method: 'put',
        data: data
    })
}
// 冻结
export function froze(id)  {
    return request({
        url: '/pln/ml/froze/'+ id,
        method: 'put'
    })
}
// 停用
export function disable(id)  {
    return request({
        url: '/pln/ml/disable/'+ id,
        method: 'put'
    })
}


// 订单号
export function getNextBillno(billCode) {
    return request({
        url: '/tool/billManager/' + billCode,
        method: 'get'
    })
}

export function updateBillSeq(billCode) {
    return request({
        url: '/tool/billManager/' + billCode,
        method: 'put'
    })
}

