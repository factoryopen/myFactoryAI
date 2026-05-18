import request from '@/utils/request'

// 查询制检异常登记列表
export function listInspectInprocess(query) {
    return request({
        url: '/exe/inspectInprocess/list',
        method: 'get',
        params: query
    })
}

// 查询制检异常登记详细
export function getInspectInprocess(id) {
    return request({
        url: '/exe/inspectInprocess/' + id,
        method: 'get'
    })
}

// 新增制检异常登记
export function addInspectInprocess(data) {
    return request({
        url: '/exe/inspectInprocess',
        method: 'post',
        data: data
    })
}

// 修改制检异常登记
export function updateInspectInprocess(data) {
    return request({
        url: '/exe/inspectInprocess',
        method: 'put',
        data: data
    })
}

// 删除制检异常登记
export function delInspectInprocess(id) {
    return request({
        url: '/exe/inspectInprocess/' + id,
        method: 'delete'
    })
}

// 请判
export function requestDeal(data)  {
    return request({
        url: '/exe/inspectInprocess/requestDeal',
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

