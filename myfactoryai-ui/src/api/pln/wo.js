import request from '@/utils/request'

// 查询工单管理列表
export function listWo(query) {
    return request({
        url: '/pln/wo/list',
        method: 'get',
        params: query
    })
}

// 查询工单管理列表
export function listWoDraft(query) {
  return request({
    url: '/pln/wo/listDraft',
    method: 'get',
    params: query
  })
}

// 查询工单管理列表
export function listWoPublishing(query) {
  return request({
    url: '/pln/wo/listPublishing',
    method: 'get',
    params: query
  })
}

// 查询工单管理列表
export function listWoProcessing(query) {
  return request({
    url: '/pln/wo/listProcessing',
    method: 'get',
    params: query
  })
}

// 查询工单管理列表
export function listWoFinishing(query) {
  return request({
    url: '/pln/wo/listFinishing',
    method: 'get',
    params: query
  })
}

// 查询工单管理列表
export function listWoHistory(query) {
  return request({
    url: '/pln/wo/listHistory',
    method: 'get',
    params: query
  })
}

// 查询工单管理列表
export function listWoAll(query) {
  return request({
    url: '/pln/wo/listAll',
    method: 'get',
    params: query
  })
}

// 查询工单管理详细
export function getWo(id) {
    return request({
        url: '/pln/wo/' + id,
        method: 'get'
    })
}

// 新增工单管理
export function addWo(data) {
    return request({
        url: '/pln/wo',
        method: 'post',
        data: data
    })
}

// 修改工单管理
export function updateWo(data) {
    return request({
        url: '/pln/wo',
        method: 'put',
        data: data
    })
}

// 删除工单管理
export function delWo(id) {
    return request({
        url: '/pln/wo/' + id,
        method: 'delete'
    })
}

// 发放
export function enable(id)  {
    return request({
        url: '/pln/wo/enable/'+ id,
        method: 'put'
    })
}
// 变更
export function changeWo(data)  {
    return request({
        url: '/pln/wo/changeWo',
        method: 'put',
        data: data
    })
}
// 冻结
export function frozeWo(id)  {
    return request({
        url: '/pln/wo/frozeWo/'+ id,
        method: 'put'
    })
}
// 停用
export function disableWo(id)  {
    return request({
        url: '/pln/wo/disableWo/'+ id,
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

