import request from '@/utils/request'

// 查询批次制程变更列表
export function listMlRoutingChange(query) {
    return request({
        url: '/exe/mlRoutingChange/list',
        method: 'get',
        params: query
    })
}

// 查询批次制程变更详细
export function getMlRoutingChange(id) {
    return request({
        url: '/exe/mlRoutingChange/' + id,
        method: 'get'
    })
}

// 新增批次制程变更
export function addMlRoutingChange(data) {
    return request({
        url: '/exe/mlRoutingChange',
        method: 'post',
        data: data
    })
}

// 修改批次制程变更
export function updateMlRoutingChange(data) {
    return request({
        url: '/exe/mlRoutingChange',
        method: 'put',
        data: data
    })
}

// 删除批次制程变更
export function delMlRoutingChange(id) {
    return request({
        url: '/exe/mlRoutingChange/' + id,
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

