import request from '@/utils/request'

// 查询采购申请列表
export function listPurchaseRequest(query) {
    return request({
        url: '/sup/purchaseRequest/list',
        method: 'get',
        params: query
    })
}

// 查询采购申请列表
export function listPurchaseRequest4fk(query) {
  return request({
    url: '/sup/purchaseRequest/list4fk',
    method: 'get',
    params: query
  })
}

// 查询采购申请详细
export function getPurchaseRequest(id) {
    return request({
        url: '/sup/purchaseRequest/' + id,
        method: 'get'
    })
}

// 新增采购申请
export function addPurchaseRequest(data) {
    return request({
        url: '/sup/purchaseRequest',
        method: 'post',
        data: data
    })
}

// 修改采购申请
export function updatePurchaseRequest(data) {
    return request({
        url: '/sup/purchaseRequest',
        method: 'put',
        data: data
    })
}

// 删除采购申请
export function delPurchaseRequest(id) {
    return request({
        url: '/sup/purchaseRequest/' + id,
        method: 'delete'
    })
}

// 请审
export function auditReq(id)  {
    return request({
        url: '/sup/purchaseRequest/auditReq/'+ id,
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

