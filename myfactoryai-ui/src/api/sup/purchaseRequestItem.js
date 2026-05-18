import request from '@/utils/request'

// 查询采购申请明细列表
export function listPurchaseRequestItem(query) {
    return request({
        url: '/sup/purchaseRequestItem/list',
        method: 'get',
        params: query
    })
}

// 查询采购申请明细详细
export function getPurchaseRequestItem(id) {
    return request({
        url: '/sup/purchaseRequestItem/' + id,
        method: 'get'
    })
}

// 新增采购申请明细
export function addPurchaseRequestItem(data) {
    return request({
        url: '/sup/purchaseRequestItem',
        method: 'post',
        data: data
    })
}

// 修改采购申请明细
export function updatePurchaseRequestItem(data) {
    return request({
        url: '/sup/purchaseRequestItem',
        method: 'put',
        data: data
    })
}

// 删除采购申请明细
export function delPurchaseRequestItem(id) {
    return request({
        url: '/sup/purchaseRequestItem/' + id,
        method: 'delete'
    })
}



