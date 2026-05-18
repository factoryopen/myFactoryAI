import request from '@/utils/request'

// 查询批次关重料列表
export function listMlRoutingkiparts(query) {
    return request({
        url: '/pln/mlRoutingkiparts/list',
        method: 'get',
        params: query
    })
}

// 查询批次关重料详细
export function getMlRoutingkiparts(id) {
    return request({
        url: '/pln/mlRoutingkiparts/' + id,
        method: 'get'
    })
}

// 新增批次关重料
export function addMlRoutingkiparts(data) {
    return request({
        url: '/pln/mlRoutingkiparts',
        method: 'post',
        data: data
    })
}

// 修改批次关重料
export function updateMlRoutingkiparts(data) {
    return request({
        url: '/pln/mlRoutingkiparts',
        method: 'put',
        data: data
    })
}

// 删除批次关重料
export function delMlRoutingkiparts(id) {
    return request({
        url: '/pln/mlRoutingkiparts/' + id,
        method: 'delete'
    })
}



