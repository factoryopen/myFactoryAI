import request from '@/utils/request'

// 查询外协收货列表
export function listOsplanReceiving(query) {
    return request({
        url: '/del/osplanReceiving/list',
        method: 'get',
        params: query
    })
}

// 查询外协收货详细
export function getOsplanReceiving(id) {
    return request({
        url: '/del/osplanReceiving/' + id,
        method: 'get'
    })
}

// 新增外协收货
export function addOsplanReceiving(data) {
    return request({
        url: '/del/osplanReceiving',
        method: 'post',
        data: data
    })
}

// 修改外协收货
export function updateOsplanReceiving(data) {
    return request({
        url: '/del/osplanReceiving',
        method: 'put',
        data: data
    })
}

// 删除外协收货
export function delOsplanReceiving(id) {
    return request({
        url: '/del/osplanReceiving/' + id,
        method: 'delete'
    })
}


// 请检
export function requestInspection(data)  {
    return request({
        url: '/del/osplanReceiving/requestInspection',
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

