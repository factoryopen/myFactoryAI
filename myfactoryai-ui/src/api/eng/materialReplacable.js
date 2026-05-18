import request from '@/utils/request'

// 查询物料替代列表
export function listMaterialReplacable(query) {
    return request({
        url: '/eng/materialReplacable/list',
        method: 'get',
        params: query
    })
}

// 查询物料替代详细
export function getMaterialReplacable(id) {
    return request({
        url: '/eng/materialReplacable/' + id,
        method: 'get'
    })
}

// 新增物料替代
export function addMaterialReplacable(data) {
    return request({
        url: '/eng/materialReplacable',
        method: 'post',
        data: data
    })
}

// 修改物料替代
export function updateMaterialReplacable(data) {
    return request({
        url: '/eng/materialReplacable',
        method: 'put',
        data: data
    })
}

// 删除物料替代
export function delMaterialReplacable(id) {
    return request({
        url: '/eng/materialReplacable/' + id,
        method: 'delete'
    })
}



