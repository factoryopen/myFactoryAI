import request from '@/utils/request'

// 查询品类BOM列表
export function listCategoryBom(query) {
    return request({
        url: '/eng/categoryBom/list',
        method: 'get',
        params: query
    })
}

// 查询品类BOM详细
export function getCategoryBom(id) {
    return request({
        url: '/eng/categoryBom/' + id,
        method: 'get'
    })
}

// 新增品类BOM
export function addCategoryBom(data) {
    return request({
        url: '/eng/categoryBom',
        method: 'post',
        data: data
    })
}

// 修改品类BOM
export function updateCategoryBom(data) {
    return request({
        url: '/eng/categoryBom',
        method: 'put',
        data: data
    })
}

// 删除品类BOM
export function delCategoryBom(id) {
    return request({
        url: '/eng/categoryBom/' + id,
        method: 'delete'
    })
}



