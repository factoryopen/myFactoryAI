import request from '@/utils/request'

// 查询工单SOP列表
export function listWoRoutingsop(query) {
    return request({
        url: '/pln/woRoutingsop/list',
        method: 'get',
        params: query
    })
}

// 查询工单SOP详细
export function getWoRoutingsop(id) {
    return request({
        url: '/pln/woRoutingsop/' + id,
        method: 'get'
    })
}

// 新增工单SOP
export function addWoRoutingsop(data) {
    return request({
        url: '/pln/woRoutingsop',
        method: 'post',
        data: data
    })
}

// 修改工单SOP
export function updateWoRoutingsop(data) {
    return request({
        url: '/pln/woRoutingsop',
        method: 'put',
        data: data
    })
}

// 删除工单SOP
export function delWoRoutingsop(id) {
    return request({
        url: '/pln/woRoutingsop/' + id,
        method: 'delete'
    })
}



