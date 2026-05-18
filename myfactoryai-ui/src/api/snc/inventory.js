import request from '@/utils/request'

// 查询仓库存货详情列表
export function listInventory(query) {
    return request({
        url: '/snc/inventory/list',
        method: 'get',
        params: query
    })
}

// 查询仓库存货详情详细
export function getInventory(id) {
    return request({
        url: '/snc/inventory/' + id,
        method: 'get'
    })
}

// 新增仓库存货详情
export function addInventory(data) {
    return request({
        url: '/snc/inventory',
        method: 'post',
        data: data
    })
}

// 修改仓库存货详情
export function updateInventory(data) {
    return request({
        url: '/snc/inventory',
        method: 'put',
        data: data
    })
}

// 删除仓库存货详情
export function delInventory(id) {
    return request({
        url: '/snc/inventory/' + id,
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

