import request from '@/utils/request'

// 查询外协计划维护列表
export function listOsplan(query) {
    return request({
        url: '/del/osplan/list',
        method: 'get',
        params: query
    })
}

// 查询外协计划维护列表
export function listOsplanDraft(query) {
  return request({
    url: '/del/osplan/listDraft',
    method: 'get',
    params: query
  })
}

// 查询外协计划维护列表
export function listOsplanPublishing(query) {
  return request({
    url: '/del/osplan/listPublishing',
    method: 'get',
    params: query
  })
}

// 查询外协计划维护列表
export function listOsplanProcessing(query) {
  return request({
    url: '/del/osplan/listProcessing',
    method: 'get',
    params: query
  })
}

// 查询外协计划维护列表
export function listOsplanFinishing(query) {
  return request({
    url: '/del/osplan/listFinishing',
    method: 'get',
    params: query
  })
}

// 查询外协计划维护列表
export function listOsplanHistory(query) {
  return request({
    url: '/del/osplan/listHistory',
    method: 'get',
    params: query
  })
}

// 查询外协计划维护列表
export function listOsplanAll(query) {
  return request({
    url: '/del/osplan/listAll',
    method: 'get',
    params: query
  })
}

// 查询外协计划维护详细
export function getOsplan(id) {
    return request({
        url: '/del/osplan/' + id,
        method: 'get'
    })
}

// 新增外协计划维护
export function addOsplan(data) {
    return request({
        url: '/del/osplan',
        method: 'post',
        data: data
    })
}

// 修改外协计划维护
export function updateOsplan(data) {
    return request({
        url: '/del/osplan',
        method: 'put',
        data: data
    })
}

// 删除外协计划维护
export function delOsplan(id) {
    return request({
        url: '/del/osplan/' + id,
        method: 'delete'
    })
}

// 变更
export function changeDelOsplan(data)  {
    return request({
        url: '/del/osplan/changeDelOsplan',
        method: 'put',
        data: data
    })
}
// 冻结
export function froze(id)  {
    return request({
        url: '/del/osplan/froze/'+ id,
        method: 'put'
    })
}
// 解冻
export function unfroze(id)  {
    return request({
        url: '/del/osplan/unfroze/'+ id,
        method: 'put'
    })
}
// 停用
export function disable(id)  {
    return request({
        url: '/del/osplan/disable/'+ id,
        method: 'put'
    })
}
// 强结
export function finishforcely(id)  {
    return request({
        url: '/del/osplan/finishforcely/'+ id,
        method: 'put'
    })
}
// 收货
export function toPr(ids)  {
    return request({
      url: '/del/osplan/toPr/'+ ids,
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

