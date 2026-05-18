import request from '@/utils/request'

// 查询采购异常分类列表
export function listPexceptionCategorytype(query) {
    return request({
        url: '/qua/pexceptionCategorytype/list',
        method: 'get',
        params: query
    })
}

// 查询采购异常分类详细
export function getPexceptionCategorytype(id) {
    return request({
        url: '/qua/pexceptionCategorytype/' + id,
        method: 'get'
    })
}

// 新增采购异常分类
export function addPexceptionCategorytype(data) {
    return request({
        url: '/qua/pexceptionCategorytype',
        method: 'post',
        data: data
    })
}

// 修改采购异常分类
export function updatePexceptionCategorytype(data) {
    return request({
        url: '/qua/pexceptionCategorytype',
        method: 'put',
        data: data
    })
}

// 删除采购异常分类
export function delPexceptionCategorytype(id) {
    return request({
        url: '/qua/pexceptionCategorytype/' + id,
        method: 'delete'
    })
}



