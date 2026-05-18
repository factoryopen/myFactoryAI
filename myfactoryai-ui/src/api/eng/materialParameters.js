import request from '@/utils/request'

// 查询物料参数列表
export function listMaterialParameters(query) {
    return request({
        url: '/eng/materialParameters/list',
        method: 'get',
        params: query
    })
}

// 查询物料参数详细
export function getMaterialParameters(id) {
    return request({
        url: '/eng/materialParameters/' + id,
        method: 'get'
    })
}

// 新增物料参数
export function addMaterialParameters(data) {
    return request({
        url: '/eng/materialParameters',
        method: 'post',
        data: data
    })
}

// 修改物料参数
export function updateMaterialParameters(data) {
    return request({
        url: '/eng/materialParameters',
        method: 'put',
        data: data
    })
}

// 删除物料参数
export function delMaterialParameters(id) {
    return request({
        url: '/eng/materialParameters/' + id,
        method: 'delete'
    })
}



