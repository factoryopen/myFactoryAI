import request from '@/utils/request'

// 查询主计划列表
export function listPlnMps(query) {
    return request({
        url: '/del/plnMps/list',
        method: 'get',
        params: query
    })
}

// 查询主计划详细
export function getPlnMps(id) {
    return request({
        url: '/del/plnMps/' + id,
        method: 'get'
    })
}

// 新增主计划
export function addPlnMps(data) {
    return request({
        url: '/del/plnMps',
        method: 'post',
        data: data
    })
}

// 修改主计划
export function updatePlnMps(data) {
    return request({
        url: '/del/plnMps',
        method: 'put',
        data: data
    })
}

// 删除主计划
export function delPlnMps(id) {
    return request({
        url: '/del/plnMps/' + id,
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

