import request from '@/utils/request'

// 查询物料生产维列表
export function listMaterialProduction(query) {
    return request({
        url: '/eng/materialProduction/list',
        method: 'get',
        params: query
    })
}

// 查询物料生产维详细
export function getMaterialProduction(id) {
    return request({
        url: '/eng/materialProduction/' + id,
        method: 'get'
    })
}

// 新增物料生产维
export function addMaterialProduction(data) {
    return request({
        url: '/eng/materialProduction',
        method: 'post',
        data: data
    })
}

// 修改物料生产维
export function updateMaterialProduction(data) {
    return request({
        url: '/eng/materialProduction',
        method: 'put',
        data: data
    })
}

// 删除物料生产维
export function delMaterialProduction(id) {
    return request({
        url: '/eng/materialProduction/' + id,
        method: 'delete'
    })
}



