import request from '@/utils/request'

// 查询交货筹划列表
export function listDeliveryDeal(query) {
    return request({
        url: '/del/deliveryDeal/list',
        method: 'get',
        params: query
    })
}

// 查询交货筹划列表
export function listDeliveryDealDraft(query) {
  return request({
    url: '/del/deliveryDeal/listDraft',
    method: 'get',
    params: query
  })
}

// 查询交货筹划列表
export function listDeliveryDealPublishing(query) {
  return request({
    url: '/del/deliveryDeal/listPublishing',
    method: 'get',
    params: query
  })
}

// 查询交货筹划列表
export function listDeliveryDealPublished(query) {
  return request({
    url: '/del/deliveryDeal/listPublished',
    method: 'get',
    params: query
  })
}

// 查询交货筹划列表
export function listDeliveryDealProcessing(query) {
  return request({
    url: '/del/deliveryDeal/listProcessing',
    method: 'get',
    params: query
  })
}

// 查询交货筹划列表
export function listDeliveryDealFinishing(query) {
  return request({
    url: '/del/deliveryDeal/listFinishing',
    method: 'get',
    params: query
  })
}

// 查询交货筹划列表
export function listDeliveryDealHistory(query) {
  return request({
    url: '/del/deliveryDeal/listHistory',
    method: 'get',
    params: query
  })
}

// 查询交货筹划列表
export function listDeliveryDealAll(query) {
  return request({
    url: '/del/deliveryDeal/listAll',
    method: 'get',
    params: query
  })
}

// 查询交货筹划详细
export function getDeliveryDeal(id) {
    return request({
        url: '/del/deliveryDeal/' + id,
        method: 'get'
    })
}

// 新增交货筹划
export function addDeliveryDeal(data) {
    return request({
        url: '/del/deliveryDeal',
        method: 'post',
        data: data
    })
}

// 修改交货筹划
export function updateDeliveryDeal(data) {
    return request({
        url: '/del/deliveryDeal',
        method: 'put',
        data: data
    })
}

// 删除交货筹划
export function delDeliveryDeal(id) {
    return request({
        url: '/del/deliveryDeal/' + id,
        method: 'delete'
    })
}

// 发货
export function planDelivery(data)  {
    return request({
        url: '/del/deliveryDeal/planDelivery',
        method: 'put',
        data: data
    })
}
// 投产
export function planMps(data)  {
    return request({
        url: '/del/deliveryDeal/planMps',
        method: 'put',
        data: data
    })
}
// 外协
export function planOs(data)  {
    return request({
        url: '/del/deliveryDeal/planOs',
        method: 'put',
        data: data
    })
}

// 变更
export function normalizeCode(data)  {
  return request({
    url: '/del/deliveryDeal/normalizeCode',
    method: 'put',
    data: data
  })
}


