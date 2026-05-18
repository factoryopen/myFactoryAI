import request from '@/utils/request'

// 查询班别列表
export function listShift(query) {
    return request({
        url: '/res/shift/list',
        method: 'get',
        params: query
    })
}

// 查询班别详细
export function getShift(id) {
    return request({
        url: '/res/shift/' + id,
        method: 'get'
    })
}

// 新增班别
export function addShift(data) {
    return request({
        url: '/res/shift',
        method: 'post',
        data: data
    })
}

// 修改班别
export function updateShift(data) {
    return request({
        url: '/res/shift',
        method: 'put',
        data: data
    })
}

// 删除班别
export function delShift(id) {
    return request({
        url: '/res/shift/' + id,
        method: 'delete'
    })
}



