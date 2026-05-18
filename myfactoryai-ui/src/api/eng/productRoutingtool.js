import request from '@/utils/request'

// 查询产品工具列表
export function listProductRoutingtool(query) {
    return request({
        url: '/eng/productRoutingtool/list',
        method: 'get',
        params: query
    })
}

// 查询产品工具详细
export function getProductRoutingtool(id) {
    return request({
        url: '/eng/productRoutingtool/' + id,
        method: 'get'
    })
}

// 新增产品工具
export function addProductRoutingtool(data) {
    return request({
        url: '/eng/productRoutingtool',
        method: 'post',
        data: data
    })
}

// 修改产品工具
export function updateProductRoutingtool(data) {
    return request({
        url: '/eng/productRoutingtool',
        method: 'put',
        data: data
    })
}

// 删除产品工具
export function delProductRoutingtool(id) {
    return request({
        url: '/eng/productRoutingtool/' + id,
        method: 'delete'
    })
}



