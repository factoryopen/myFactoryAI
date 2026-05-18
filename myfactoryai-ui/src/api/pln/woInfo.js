import request from '@/utils/request'

// 查询工单信息列表
export function listWoInfo(query) {
    return request({
        url: '/pln/woInfo/list',
        method: 'get',
        params: query
    })
}

// 查询工单信息详细
export function getWoInfo(id) {
    return request({
        url: '/pln/woInfo/' + id,
        method: 'get'
    })
}

// 新增工单信息
export function addWoInfo(data) {
    return request({
        url: '/pln/woInfo',
        method: 'post',
        data: data
    })
}

// 修改工单信息
export function updateWoInfo(data) {
    return request({
        url: '/pln/woInfo',
        method: 'put',
        data: data
    })
}

// 删除工单信息
export function delWoInfo(id) {
    return request({
        url: '/pln/woInfo/' + id,
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

