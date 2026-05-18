import request from '@/utils/request'

// 查询品类工艺路线列表
export function listCategoryRouting(query) {
    return request({
        url: '/eng/categoryRouting/list',
        method: 'get',
        params: query
    })
}

// 查询品类工艺路线详细
export function getCategoryRouting(id) {
    return request({
        url: '/eng/categoryRouting/' + id,
        method: 'get'
    })
}

// 新增品类工艺路线
export function addCategoryRouting(data) {
    return request({
        url: '/eng/categoryRouting',
        method: 'post',
        data: data
    })
}

// 修改品类工艺路线
export function updateCategoryRouting(data) {
    return request({
        url: '/eng/categoryRouting',
        method: 'put',
        data: data
    })
}

// 删除品类工艺路线
export function delCategoryRouting(id) {
    return request({
        url: '/eng/categoryRouting/' + id,
        method: 'delete'
    })
}



