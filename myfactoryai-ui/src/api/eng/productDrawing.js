import request from '@/utils/request'

// 查询产品图纸列表
export function listProductDrawing(query) {
    return request({
        url: '/eng/productDrawing/list',
        method: 'get',
        params: query
    })
}

// 查询产品图纸详细
export function getProductDrawing(id) {
    return request({
        url: '/eng/productDrawing/' + id,
        method: 'get'
    })
}

// 新增产品图纸
export function addProductDrawing(data) {
    return request({
        url: '/eng/productDrawing',
        method: 'post',
        data: data
    })
}

// 修改产品图纸
export function updateProductDrawing(data) {
    return request({
        url: '/eng/productDrawing',
        method: 'put',
        data: data
    })
}

// 删除产品图纸
export function delProductDrawing(id) {
    return request({
        url: '/eng/productDrawing/' + id,
        method: 'delete'
    })
}



