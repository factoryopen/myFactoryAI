import request from '@/utils/request'

// 查询产品关重料列表
export function listProductRoutingkiparts(query) {
    return request({
        url: '/eng/productRoutingkiparts/list',
        method: 'get',
        params: query
    })
}

// 查询产品关重料详细
export function getProductRoutingkiparts(id) {
    return request({
        url: '/eng/productRoutingkiparts/' + id,
        method: 'get'
    })
}

// 新增产品关重料
export function addProductRoutingkiparts(data) {
    return request({
        url: '/eng/productRoutingkiparts',
        method: 'post',
        data: data
    })
}

// 修改产品关重料
export function updateProductRoutingkiparts(data) {
    return request({
        url: '/eng/productRoutingkiparts',
        method: 'put',
        data: data
    })
}

// 删除产品关重料
export function delProductRoutingkiparts(id) {
    return request({
        url: '/eng/productRoutingkiparts/' + id,
        method: 'delete'
    })
}



