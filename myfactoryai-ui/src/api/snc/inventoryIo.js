import request from '@/utils/request'

// 查询仓库存货流水列表
export function listInventoryIo(query) {
    return request({
        url: '/snc/inventoryIo/list',
        method: 'get',
        params: query
    })
}

// 查询仓库存货流水详细
export function getInventoryIo(id) {
    return request({
        url: '/snc/inventoryIo/' + id,
        method: 'get'
    })
}

// 新增仓库存货流水
export function addInventoryIo(data) {
    return request({
        url: '/snc/inventoryIo',
        method: 'post',
        data: data
    })
}

// 修改仓库存货流水
export function updateInventoryIo(data) {
    return request({
        url: '/snc/inventoryIo',
        method: 'put',
        data: data
    })
}

// 删除仓库存货流水
export function delInventoryIo(id) {
    return request({
        url: '/snc/inventoryIo/' + id,
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

