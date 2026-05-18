import request from '@/utils/request'

// 查询产品SOP列表
export function listPruductSop(query) {
    return request({
        url: '/eng/pruductSop/list',
        method: 'get',
        params: query
    })
}

// 查询产品SOP详细
export function getPruductSop(id) {
    return request({
        url: '/eng/pruductSop/' + id,
        method: 'get'
    })
}

// 新增产品SOP
export function addPruductSop(data) {
    return request({
        url: '/eng/pruductSop',
        method: 'post',
        data: data
    })
}

// 修改产品SOP
export function updatePruductSop(data) {
    return request({
        url: '/eng/pruductSop',
        method: 'put',
        data: data
    })
}

// 删除产品SOP
export function delPruductSop(id) {
    return request({
        url: '/eng/pruductSop/' + id,
        method: 'delete'
    })
}



