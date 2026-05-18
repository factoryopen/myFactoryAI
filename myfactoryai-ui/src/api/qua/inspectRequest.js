import request from '@/utils/request'

// 查询质检请求通知列表
export function listInspectRequest(query) {
    return request({
        url: '/qua/inspectRequest/list',
        method: 'get',
        params: query
    })
}

// 查询质检请求通知详细
export function getInspectRequest(id) {
    return request({
        url: '/qua/inspectRequest/' + id,
        method: 'get'
    })
}

// 新增质检请求通知
export function addInspectRequest(data) {
    return request({
        url: '/qua/inspectRequest',
        method: 'post',
        data: data
    })
}

// 修改质检请求通知
export function updateInspectRequest(data) {
    return request({
        url: '/qua/inspectRequest',
        method: 'put',
        data: data
    })
}

// 删除质检请求通知
export function delInspectRequest(id) {
    return request({
        url: '/qua/inspectRequest/' + id,
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

