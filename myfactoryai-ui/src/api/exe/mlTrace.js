import request from '@/utils/request'

// 查询在制批次跟踪列表
export function listMlTrace(query) {
    return request({
        url: '/exe/mlTrace/list',
        method: 'get',
        params: query
    })
}

// 查询在制批次跟踪详细
export function getMlTrace(id) {
    return request({
        url: '/exe/mlTrace/' + id,
        method: 'get'
    })
}

// 新增在制批次跟踪
export function addMlTrace(data) {
    return request({
        url: '/exe/mlTrace',
        method: 'post',
        data: data
    })
}

// 修改在制批次跟踪
export function updateMlTrace(data) {
    return request({
        url: '/exe/mlTrace',
        method: 'put',
        data: data
    })
}

// 删除在制批次跟踪
export function delMlTrace(id) {
    return request({
        url: '/exe/mlTrace/' + id,
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

