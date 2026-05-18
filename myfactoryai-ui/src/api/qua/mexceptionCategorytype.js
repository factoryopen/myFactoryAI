import request from '@/utils/request'

// 查询制造异常分类列表
export function listMexceptionCategorytype(query) {
    return request({
        url: '/qua/mexceptionCategorytype/list',
        method: 'get',
        params: query
    })
}

// 查询制造异常分类详细
export function getMexceptionCategorytype(id) {
    return request({
        url: '/qua/mexceptionCategorytype/' + id,
        method: 'get'
    })
}

// 新增制造异常分类
export function addMexceptionCategorytype(data) {
    return request({
        url: '/qua/mexceptionCategorytype',
        method: 'post',
        data: data
    })
}

// 修改制造异常分类
export function updateMexceptionCategorytype(data) {
    return request({
        url: '/qua/mexceptionCategorytype',
        method: 'put',
        data: data
    })
}

// 删除制造异常分类
export function delMexceptionCategorytype(id) {
    return request({
        url: '/qua/mexceptionCategorytype/' + id,
        method: 'delete'
    })
}



