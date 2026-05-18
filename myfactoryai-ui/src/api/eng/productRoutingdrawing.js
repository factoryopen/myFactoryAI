import request from '@/utils/request'

// 查询产品工序图列表
export function listProductRoutingdrawing(query) {
    return request({
        url: '/eng/productRoutingdrawing/list',
        method: 'get',
        params: query
    })
}

// 查询产品工序图详细
export function getProductRoutingdrawing(id) {
    return request({
        url: '/eng/productRoutingdrawing/' + id,
        method: 'get'
    })
}

// 新增产品工序图
export function addProductRoutingdrawing(data) {
    return request({
        url: '/eng/productRoutingdrawing',
        method: 'post',
        data: data
    })
}

// 修改产品工序图
export function updateProductRoutingdrawing(data) {
    return request({
        url: '/eng/productRoutingdrawing',
        method: 'put',
        data: data
    })
}

// 删除产品工序图
export function delProductRoutingdrawing(id) {
    return request({
        url: '/eng/productRoutingdrawing/' + id,
        method: 'delete'
    })
}



