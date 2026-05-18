import request from '@/utils/request'

// 查询制造批次尾情列表
export function listMlHistoryTail(query) {
    return request({
        url: '/exe/mlHistoryTail/list',
        method: 'get',
        params: query
    })
}

// 查询制造批次尾情详细
export function getMlHistoryTail(id) {
    return request({
        url: '/exe/mlHistoryTail/' + id,
        method: 'get'
    })
}

// 新增制造批次尾情
export function addMlHistoryTail(data) {
    return request({
        url: '/exe/mlHistoryTail',
        method: 'post',
        data: data
    })
}

// 修改制造批次尾情
export function updateMlHistoryTail(data) {
    return request({
        url: '/exe/mlHistoryTail',
        method: 'put',
        data: data
    })
}

// 删除制造批次尾情
export function delMlHistoryTail(id) {
    return request({
        url: '/exe/mlHistoryTail/' + id,
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

