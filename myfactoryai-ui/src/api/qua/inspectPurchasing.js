import request from '@/utils/request'

// 查询外购检异登记列表
export function listInspectPurchasing(query) {
    return request({
        url: '/qua/inspectPurchasing/list',
        method: 'get',
        params: query
    })
}

// 查询外购检异登记详细
export function getInspectPurchasing(id) {
    return request({
        url: '/qua/inspectPurchasing/' + id,
        method: 'get'
    })
}

// 新增外购检异登记
export function addInspectPurchasing(data) {
    return request({
        url: '/qua/inspectPurchasing',
        method: 'post',
        data: data
    })
}

// 修改外购检异登记
export function updateInspectPurchasing(data) {
    return request({
        url: '/qua/inspectPurchasing',
        method: 'put',
        data: data
    })
}

// 删除外购检异登记
export function delInspectPurchasing(id) {
    return request({
        url: '/qua/inspectPurchasing/' + id,
        method: 'delete'
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

