import request from '@/utils/request'

// 查询工单关重料列表
export function listWoRoutingkiparts(query) {
    return request({
        url: '/pln/woRoutingkiparts/list',
        method: 'get',
        params: query
    })
}

// 查询工单关重料详细
export function getWoRoutingkiparts(id) {
    return request({
        url: '/pln/woRoutingkiparts/' + id,
        method: 'get'
    })
}

// 新增工单关重料
export function addWoRoutingkiparts(data) {
    return request({
        url: '/pln/woRoutingkiparts',
        method: 'post',
        data: data
    })
}

// 修改工单关重料
export function updateWoRoutingkiparts(data) {
    return request({
        url: '/pln/woRoutingkiparts',
        method: 'put',
        data: data
    })
}

// 删除工单关重料
export function delWoRoutingkiparts(id) {
    return request({
        url: '/pln/woRoutingkiparts/' + id,
        method: 'delete'
    })
}



