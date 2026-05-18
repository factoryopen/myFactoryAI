import request from '@/utils/request'

// 查询物料存货维列表
export function listMaterialInventory(query) {
    return request({
        url: '/eng/materialInventory/list',
        method: 'get',
        params: query
    })
}

// 查询物料存货维详细
export function getMaterialInventory(id) {
    return request({
        url: '/eng/materialInventory/' + id,
        method: 'get'
    })
}

// 新增物料存货维
export function addMaterialInventory(data) {
    return request({
        url: '/eng/materialInventory',
        method: 'post',
        data: data
    })
}

// 修改物料存货维
export function updateMaterialInventory(data) {
    return request({
        url: '/eng/materialInventory',
        method: 'put',
        data: data
    })
}

// 删除物料存货维
export function delMaterialInventory(id) {
    return request({
        url: '/eng/materialInventory/' + id,
        method: 'delete'
    })
}



