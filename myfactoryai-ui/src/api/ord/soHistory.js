import request from '@/utils/request'

// 查询订单历史查询列表
export function listSoHistory(query) {
    return request({
        url: '/ord/soHistory/list',
        method: 'get',
        params: query
    })
}

// 查询订单历史查询详细
export function getSoHistory(id) {
    return request({
        url: '/ord/soHistory/' + id,
        method: 'get'
    })
}

// 新增订单历史查询
export function addSoHistory(data) {
    return request({
        url: '/ord/soHistory',
        method: 'post',
        data: data
    })
}

// 修改订单历史查询
export function updateSoHistory(data) {
    return request({
        url: '/ord/soHistory',
        method: 'put',
        data: data
    })
}

// 删除订单历史查询
export function delSoHistory(id) {
    return request({
        url: '/ord/soHistory/' + id,
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

