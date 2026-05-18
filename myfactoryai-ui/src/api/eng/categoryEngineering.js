import request from '@/utils/request'

// 查询品类工艺列表
export function listCategoryEngineering(query) {
    return request({
        url: '/eng/categoryEngineering/list',
        method: 'get',
        params: query
    })
}

// 查询品类工艺详细
export function getCategoryEngineering(id) {
    return request({
        url: '/eng/categoryEngineering/' + id,
        method: 'get'
    })
}

// 新增品类工艺
export function addCategoryEngineering(data) {
    return request({
        url: '/eng/categoryEngineering',
        method: 'post',
        data: data
    })
}

// 修改品类工艺
export function updateCategoryEngineering(data) {
    return request({
        url: '/eng/categoryEngineering',
        method: 'put',
        data: data
    })
}

// 删除品类工艺
export function delCategoryEngineering(id) {
    return request({
        url: '/eng/categoryEngineering/' + id,
        method: 'delete'
    })
}

// 填补子孙
export function fillChildren(data)  {
    return request({
        url: '/eng/categoryEngineering/fillChildren',
        method: 'put',
        data: data
    })
}
// 覆盖子孙
export function coverChildren(data)  {
    return request({
        url: '/eng/categoryEngineering/coverChildren',
        method: 'put',
        data: data
    })
}


