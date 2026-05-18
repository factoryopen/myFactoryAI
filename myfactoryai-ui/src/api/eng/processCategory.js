import request from '@/utils/request'

// 查询制程数据列表
export function listProcessCategory(query) {
    return request({
        url: '/eng/processCategory/list',
        method: 'get',
        params: query
    })
}

// 查询制程数据详细
export function getProcessCategory(id) {
    return request({
        url: '/eng/processCategory/' + id,
        method: 'get'
    })
}

// 新增制程数据
export function addProcessCategory(data) {
    return request({
        url: '/eng/processCategory',
        method: 'post',
        data: data
    })
}

// 修改制程数据
export function updateProcessCategory(data) {
    return request({
        url: '/eng/processCategory',
        method: 'put',
        data: data
    })
}

// 删除制程数据
export function delProcessCategory(id) {
    return request({
        url: '/eng/processCategory/' + id,
        method: 'delete'
    })
}



