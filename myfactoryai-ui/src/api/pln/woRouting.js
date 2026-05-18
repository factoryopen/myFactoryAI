import request from '@/utils/request'

// 查询工单工艺管理列表
export function listWoRouting(query) {
    return request({
        url: '/pln/woRouting/list',
        method: 'get',
        params: query
    })
}

// 查询工单工艺管理详细
export function getWoRouting(id) {
    return request({
        url: '/pln/woRouting/' + id,
        method: 'get'
    })
}

// 新增工单工艺管理
export function addWoRouting(data) {
    return request({
        url: '/pln/woRouting',
        method: 'post',
        data: data
    })
}

// 修改工单工艺管理
export function updateWoRouting(data) {
    return request({
        url: '/pln/woRouting',
        method: 'put',
        data: data
    })
}

// 删除工单工艺管理
export function delWoRouting(id) {
    return request({
        url: '/pln/woRouting/' + id,
        method: 'delete'
    })
}



