import request from '@/utils/request'

// 查询主计划维护列表
export function listMps(query) {
    return request({
        url: '/del/mps/list',
        method: 'get',
        params: query
    })
}

// 查询主计划维护列表
export function listMpsDraft(query) {
  return request({
    url: '/del/mps/listDraft',
    method: 'get',
    params: query
  })
}

// 查询主计划维护列表
export function listMpsPublishing(query) {
  return request({
    url: '/del/mps/listPublishing',
    method: 'get',
    params: query
  })
}

// 查询主计划维护列表
export function listMpsProcessing(query) {
  return request({
    url: '/del/mps/listProcessing',
    method: 'get',
    params: query
  })
}

// 查询主计划维护列表
export function listMpsFinishing(query) {
  return request({
    url: '/del/mps/listFinishing',
    method: 'get',
    params: query
  })
}

// 查询主计划维护列表
export function listMpsHistory(query) {
  return request({
    url: '/del/mps/listHistory',
    method: 'get',
    params: query
  })
}

// 查询主计划维护列表
export function listMpsAll(query) {
  return request({
    url: '/del/mps/listAll',
    method: 'get',
    params: query
  })
}

// 查询主计划维护详细
export function getMps(id) {
    return request({
        url: '/del/mps/' + id,
        method: 'get'
    })
}

// 新增主计划维护
export function addMps(data) {
    return request({
        url: '/del/mps',
        method: 'post',
        data: data
    })
}

// 修改主计划维护
export function updateMps(data) {
    return request({
        url: '/del/mps',
        method: 'put',
        data: data
    })
}

// 删除主计划维护
export function delMps(ids) {
    return request({
        url: '/del/mps/' + ids,
        method: 'delete'
    })
}

// 发布
export function enable(ids)  {
  return request({
    url: '/del/mps/enable/'+ ids,
    method: 'put'
  })
}

// 变更
export function changeDelMps(data)  {
    return request({
        url: '/del/mps/changeDelMps',
        method: 'put',
        data: data
    })
}
// 冻结
export function froze(id)  {
    return request({
        url: '/del/mps/froze/'+ id,
        method: 'put'
    })
}
// 解冻
export function unfroze(id)  {
    return request({
        url: '/del/mps/unfroze/'+ id,
        method: 'put'
    })
}
// 停用
export function disable(id)  {
    return request({
        url: '/del/mps/disable/'+ id,
        method: 'put'
    })
}

// 通知退货
export function noticeEngineering(data)  {
  return request({
    url: '/del/mps/noticeEngineering',
    method: 'put',
    data: data
  })
}

// 变更
export function normalizeCode(data)  {
  return request({
    url: '/del/mps/normalizeCode',
    method: 'put',
    data: data
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

