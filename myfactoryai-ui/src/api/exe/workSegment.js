import request from '@/utils/request'

// 查询历史出工查询列表
export function listWorkSegment(query) {
    return request({
        url: '/exe/workSegment/list',
        method: 'get',
        params: query
    })
}

// 查询历史出工查询详细
export function getWorkSegment(id) {
    return request({
        url: '/exe/workSegment/' + id,
        method: 'get'
    })
}

// 新增历史出工查询
export function addWorkSegment(data) {
    return request({
        url: '/exe/workSegment',
        method: 'post',
        data: data
    })
}

// 修改历史出工查询
export function updateWorkSegment(data) {
    return request({
        url: '/exe/workSegment',
        method: 'put',
        data: data
    })
}

// 删除历史出工查询
export function delWorkSegment(id) {
    return request({
        url: '/exe/workSegment/' + id,
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

