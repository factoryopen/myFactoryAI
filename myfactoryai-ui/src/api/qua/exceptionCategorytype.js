import request from '@/utils/request'

// 查询异常分类管理列表
export function listExceptionCategorytype(query) {
    return request({
        url: '/qua/exceptionCategorytype/list',
        method: 'get',
        params: query
    })
}

// 查询异常分类管理详细
export function getExceptionCategorytype(id) {
    return request({
        url: '/qua/exceptionCategorytype/' + id,
        method: 'get'
    })
}

// 新增异常分类管理
export function addExceptionCategorytype(data) {
    return request({
        url: '/qua/exceptionCategorytype',
        method: 'post',
        data: data
    })
}

// 修改异常分类管理
export function updateExceptionCategorytype(data) {
    return request({
        url: '/qua/exceptionCategorytype',
        method: 'put',
        data: data
    })
}

// 删除异常分类管理
export function delExceptionCategorytype(id) {
    return request({
        url: '/qua/exceptionCategorytype/' + id,
        method: 'delete'
    })
}



