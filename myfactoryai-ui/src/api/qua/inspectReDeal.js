import request from '@/utils/request'

// 查询质检请求处理列表
export function listInspectReDeal(query) {
    return request({
        url: '/qua/inspectReDeal/list',
        method: 'get',
        params: query
    })
}

// 查询质检请求处理详细
export function getInspectReDeal(id) {
    return request({
        url: '/qua/inspectReDeal/' + id,
        method: 'get'
    })
}

// 新增质检请求处理
export function addInspectReDeal(data) {
    return request({
        url: '/qua/inspectReDeal',
        method: 'post',
        data: data
    })
}

// 修改质检请求处理
export function updateInspectReDeal(data) {
    return request({
        url: '/qua/inspectReDeal',
        method: 'put',
        data: data
    })
}

// 删除质检请求处理
export function delInspectReDeal(id) {
    return request({
        url: '/qua/inspectReDeal/' + id,
        method: 'delete'
    })
}

// 收检
export function acceptInspection(data) {
    return request({
        url: '/qua/inspectReDeal/acceptInspection',
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

