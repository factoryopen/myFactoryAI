import request from '@/utils/request'

// 查询工艺异常分类列表
export function listExceptionCategorytype(query) {
    return request({
        url: '/eng/exceptionCategorytype/list',
        method: 'get',
        params: query
    })
}

// 查询工艺异常分类详细
export function getExceptionCategorytype(id) {
    return request({
        url: '/eng/exceptionCategorytype/' + id,
        method: 'get'
    })
}

// 新增工艺异常分类
export function addExceptionCategorytype(data) {
    return request({
        url: '/eng/exceptionCategorytype',
        method: 'post',
        data: data
    })
}

// 修改工艺异常分类
export function updateExceptionCategorytype(data) {
    return request({
        url: '/eng/exceptionCategorytype',
        method: 'put',
        data: data
    })
}

// 删除工艺异常分类
export function delExceptionCategorytype(id) {
    return request({
        url: '/eng/exceptionCategorytype/' + id,
        method: 'delete'
    })
}



