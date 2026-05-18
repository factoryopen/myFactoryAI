import request from '@/utils/request'

// 查询储位列表
export function listWarePosition(query) {
    return request({
        url: '/res/warePosition/list',
        method: 'get',
        params: query
    })
}

// 查询储位详细
export function getWarePosition(id) {
    return request({
        url: '/res/warePosition/' + id,
        method: 'get'
    })
}

// 新增储位
export function addWarePosition(data) {
    return request({
        url: '/res/warePosition',
        method: 'post',
        data: data
    })
}

// 修改储位
export function updateWarePosition(data) {
    return request({
        url: '/res/warePosition',
        method: 'put',
        data: data
    })
}

// 删除储位
export function delWarePosition(id) {
    return request({
        url: '/res/warePosition/' + id,
        method: 'delete'
    })
}



