import request from '@/utils/request'

// 查询制造工艺管理列表
export function listProductRouting(query) {
    return request({
        url: '/eng/productRouting/list',
        method: 'get',
        params: query
    })
}

// 查询制造工艺管理详细
export function getProductRouting(id) {
    return request({
        url: '/eng/productRouting/' + id,
        method: 'get'
    })
}

// 新增制造工艺管理
export function addProductRouting(data) {
    return request({
        url: '/eng/productRouting',
        method: 'post',
        data: data
    })
}

// 修改制造工艺管理
export function updateProductRouting(data) {
    return request({
        url: '/eng/productRouting',
        method: 'put',
        data: data
    })
}

// 删除制造工艺管理
export function delProductRouting(id) {
    return request({
        url: '/eng/productRouting/' + id,
        method: 'delete'
    })
}



