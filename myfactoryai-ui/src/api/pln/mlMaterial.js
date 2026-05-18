import request from '@/utils/request'

// 查询批次备料单列表
export function listMlMaterial(query) {
    return request({
        url: '/pln/mlMaterial/list',
        method: 'get',
        params: query
    })
}

// 查询批次备料单详细
export function getMlMaterial(id) {
    return request({
        url: '/pln/mlMaterial/' + id,
        method: 'get'
    })
}

// 新增批次备料单
export function addMlMaterial(data) {
    return request({
        url: '/pln/mlMaterial',
        method: 'post',
        data: data
    })
}

// 修改批次备料单
export function updateMlMaterial(data) {
    return request({
        url: '/pln/mlMaterial',
        method: 'put',
        data: data
    })
}

// 删除批次备料单
export function delMlMaterial(id) {
    return request({
        url: '/pln/mlMaterial/' + id,
        method: 'delete'
    })
}



