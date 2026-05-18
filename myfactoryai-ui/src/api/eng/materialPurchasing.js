import request from '@/utils/request'

// 查询物料采购维列表
export function listMaterialPurchasing(query) {
    return request({
        url: '/eng/materialPurchasing/list',
        method: 'get',
        params: query
    })
}

// 查询物料采购维详细
export function getMaterialPurchasing(id) {
    return request({
        url: '/eng/materialPurchasing/' + id,
        method: 'get'
    })
}

// 新增物料采购维
export function addMaterialPurchasing(data) {
    return request({
        url: '/eng/materialPurchasing',
        method: 'post',
        data: data
    })
}

// 修改物料采购维
export function updateMaterialPurchasing(data) {
    return request({
        url: '/eng/materialPurchasing',
        method: 'put',
        data: data
    })
}

// 删除物料采购维
export function delMaterialPurchasing(id) {
    return request({
        url: '/eng/materialPurchasing/' + id,
        method: 'delete'
    })
}



