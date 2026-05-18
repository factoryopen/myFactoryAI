import request from '@/utils/request'

// 查询发货单管理列表
export function listDeliveryOrder(query) {
    return request({
        url: '/del/deliveryOrder/list',
        method: 'get',
        params: query
    })
}

// 查询发货单管理列表
export function listDeliveryOrderDraft(query) {
  return request({
    url: '/del/deliveryOrder/listDraft',
    method: 'get',
    params: query
  })
}

// 查询发货单管理列表
export function listDeliveryOrderPublishing(query) {
  return request({
    url: '/del/deliveryOrder/listPublishing',
    method: 'get',
    params: query
  })
}

// 查询发货单管理列表
export function listDeliveryOrderProcessing(query) {
  return request({
    url: '/del/deliveryOrder/listProcessing',
    method: 'get',
    params: query
  })
}

// 查询发货单管理列表
export function listDeliveryOrderFinishing(query) {
  return request({
    url: '/del/deliveryOrder/listFinishing',
    method: 'get',
    params: query
  })
}

// 查询发货单管理列表
export function listDeliveryOrderHistory(query) {
  return request({
    url: '/del/deliveryOrder/listHistory',
    method: 'get',
    params: query
  })
}

// 查询发货单管理列表
export function listDeliveryOrderAll(query) {
  return request({
    url: '/del/deliveryOrder/listAll',
    method: 'get',
    params: query
  })
}

// 查询发货单管理详细
export function getDeliveryOrder(id) {
    return request({
        url: '/del/deliveryOrder/' + id,
        method: 'get'
    })
}

// 新增发货单管理
export function addDeliveryOrder(data) {
    return request({
        url: '/del/deliveryOrder',
        method: 'post',
        data: data
    })
}

// 修改发货单管理
export function updateDeliveryOrder(data) {
    return request({
        url: '/del/deliveryOrder',
        method: 'put',
        data: data
    })
}

// 删除发货单管理
export function delDeliveryOrder(id) {
    return request({
        url: '/del/deliveryOrder/' + id,
        method: 'delete'
    })
}

// 冻结
export function froze(id)  {
    return request({
        url: '/del/deliveryOrder/froze/'+ id,
        method: 'put'
    })
}
// 解冻
export function unfroze(id)  {
    return request({
        url: '/del/deliveryOrder/unfroze/'+ id,
        method: 'put'
    })
}
// 停用
export function disable(id)  {
    return request({
        url: '/del/deliveryOrder/disable/'+ id,
        method: 'put'
    })
}
// 结案
export function finish(ids)  {
  return request({
    url: '/del/deliveryOrder/finish/'+ ids,
    method: 'put'
  })
}
// 强结
export function finishforcely(ids)  {
    return request({
        url: '/del/deliveryOrder/finishforcely/'+ ids,
        method: 'put'
    })
}
// 变更
export function changeDelDeliveryOrder(data)  {
    return request({
        url: '/del/deliveryOrder/changeDelDeliveryOrder',
        method: 'put',
        data: data
    })
}
// 发货
export function delivery(ids)  {
    return request({
        url: '/del/deliveryOrder/delivery/'+ ids,
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

