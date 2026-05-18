import request from '@/utils/request'

// 查询发货计划维护列表
export function listDeliveryPlan(query) {
    return request({
        url: '/del/deliveryPlan/list',
        method: 'get',
        params: query
    })
}

// 查询发货计划维护列表
export function listDeliveryPlanDraft(query) {
  return request({
    url: '/del/deliveryPlan/listDraft',
    method: 'get',
    params: query
  })
}

// 查询发货计划维护列表
export function listDeliveryPlanPublishing(query) {
  return request({
    url: '/del/deliveryPlan/listPublishing',
    method: 'get',
    params: query
  })
}

// 查询发货计划维护列表
export function listDeliveryPlanProcessing(query) {
  return request({
    url: '/del/deliveryPlan/listProcessing',
    method: 'get',
    params: query
  })
}

// 查询发货计划维护列表
export function listDeliveryPlanFinishing(query) {
  return request({
    url: '/del/deliveryPlan/listFinishing',
    method: 'get',
    params: query
  })
}

// 查询发货计划维护列表
export function listDeliveryPlanHistory(query) {
  return request({
    url: '/del/deliveryPlan/listHistory',
    method: 'get',
    params: query
  })
}

// 查询发货计划维护列表
export function listDeliveryPlanAll(query) {
  return request({
    url: '/del/deliveryPlan/listAll',
    method: 'get',
    params: query
  })
}

// 查询发货计划维护详细
export function getDeliveryPlan(id) {
    return request({
        url: '/del/deliveryPlan/' + id,
        method: 'get'
    })
}

// 新增发货计划维护
export function addDeliveryPlan(data) {
    return request({
        url: '/del/deliveryPlan',
        method: 'post',
        data: data
    })
}

// 修改发货计划维护
export function updateDeliveryPlan(data) {
    return request({
        url: '/del/deliveryPlan',
        method: 'put',
        data: data
    })
}

// 删除发货计划维护
export function delDeliveryPlan(id) {
    return request({
        url: '/del/deliveryPlan/' + id,
        method: 'delete'
    })
}

// 冻结
export function froze(id)  {
    return request({
        url: '/del/deliveryPlan/froze/'+ id,
        method: 'put'
    })
}
// 解冻
export function unfroze(id)  {
    return request({
        url: '/del/deliveryPlan/unfroze/'+ id,
        method: 'put'
    })
}
// 停用
export function disable(id)  {
    return request({
        url: '/del/deliveryPlan/disable/'+ id,
        method: 'put'
    })
}
// 强结
export function finishforcely(id)  {
    return request({
        url: '/del/deliveryPlan/finishforcely/'+ id,
        method: 'put'
    })
}
// 转单
export function billDelivery(ids, data)  {
    return request({
        url: '/del/deliveryPlan/billDelivery/'+ ids,
        method: 'put',
        data: data
    })
}


