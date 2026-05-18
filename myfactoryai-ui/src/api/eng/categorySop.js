import request from '@/utils/request'

// 查询品类SOP列表
export function listCategorySop(query) {
    return request({
        url: '/eng/categorySop/list',
        method: 'get',
        params: query
    })
}

// 查询品类SOP详细
export function getCategorySop(id) {
    return request({
        url: '/eng/categorySop/' + id,
        method: 'get'
    })
}

// 新增品类SOP
export function addCategorySop(data) {
    return request({
        url: '/eng/categorySop',
        method: 'post',
        data: data
    })
}

// 修改品类SOP
export function updateCategorySop(data) {
    return request({
        url: '/eng/categorySop',
        method: 'put',
        data: data
    })
}

// 删除品类SOP
export function delCategorySop(id) {
    return request({
        url: '/eng/categorySop/' + id,
        method: 'delete'
    })
}



