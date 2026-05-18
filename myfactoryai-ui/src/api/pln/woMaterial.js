import request from '@/utils/request'

// 查询工单发料列表
export function listWoMaterial(query) {
    return request({
        url: '/pln/woMaterial/list',
        method: 'get',
        params: query
    })
}

// 查询工单发料详细
export function getWoMaterial(id) {
    return request({
        url: '/pln/woMaterial/' + id,
        method: 'get'
    })
}

// 新增工单发料
export function addWoMaterial(data) {
    return request({
        url: '/pln/woMaterial',
        method: 'post',
        data: data
    })
}

// 修改工单发料
export function updateWoMaterial(data) {
    return request({
        url: '/pln/woMaterial',
        method: 'put',
        data: data
    })
}

// 删除工单发料
export function delWoMaterial(id) {
    return request({
        url: '/pln/woMaterial/' + id,
        method: 'delete'
    })
}



