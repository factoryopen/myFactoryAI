import request from '@/utils/request'

// 查询产品SOP列表
export function listPruductRoutingsop(query) {
    return request({
        url: '/eng/pruductRoutingsop/list',
        method: 'get',
        params: query
    })
}

// 查询产品SOP详细
export function getPruductRoutingsop(id) {
    return request({
        url: '/eng/pruductRoutingsop/' + id,
        method: 'get'
    })
}

// 新增产品SOP
export function addPruductRoutingsop(data) {
    return request({
        url: '/eng/pruductRoutingsop',
        method: 'post',
        data: data
    })
}

// 修改产品SOP
export function updatePruductRoutingsop(data) {
    return request({
        url: '/eng/pruductRoutingsop',
        method: 'put',
        data: data
    })
}

// 删除产品SOP
export function delPruductRoutingsop(id) {
    return request({
        url: '/eng/pruductRoutingsop/' + id,
        method: 'delete'
    })
}



