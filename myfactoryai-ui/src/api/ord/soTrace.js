import request from '@/utils/request'

// 查询在制订单跟踪列表
export function listSoTrace(query) {
    return request({
        url: '/ord/soTrace/list',
        method: 'get',
        params: query
    })
}

// 查询在制订单跟踪详细
export function getSoTrace(id) {
    return request({
        url: '/ord/soTrace/' + id,
        method: 'get'
    })
}

// 新增在制订单跟踪
export function addSoTrace(data) {
    return request({
        url: '/ord/soTrace',
        method: 'post',
        data: data
    })
}

// 修改在制订单跟踪
export function updateSoTrace(data) {
    return request({
        url: '/ord/soTrace',
        method: 'put',
        data: data
    })
}

// 删除在制订单跟踪
export function delSoTrace(id) {
    return request({
        url: '/ord/soTrace/' + id,
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

