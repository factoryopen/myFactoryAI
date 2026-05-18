import request from '@/utils/request'

// 查询工单SOP列表
export function listWoSop(query) {
    return request({
        url: '/pln/woSop/list',
        method: 'get',
        params: query
    })
}

// 查询工单SOP详细
export function getWoSop(id) {
    return request({
        url: '/pln/woSop/' + id,
        method: 'get'
    })
}

// 新增工单SOP
export function addWoSop(data) {
    return request({
        url: '/pln/woSop',
        method: 'post',
        data: data
    })
}

// 修改工单SOP
export function updateWoSop(data) {
    return request({
        url: '/pln/woSop',
        method: 'put',
        data: data
    })
}

// 删除工单SOP
export function delWoSop(id) {
    return request({
        url: '/pln/woSop/' + id,
        method: 'delete'
    })
}



