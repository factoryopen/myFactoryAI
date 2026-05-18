import request from '@/utils/request'

// 查询班组管理列表
export function listWorkgroup(query) {
    return request({
        url: '/res/workgroup/list',
        method: 'get',
        params: query
    })
}

// 查询班组管理详细
export function getWorkgroup(id) {
    return request({
        url: '/res/workgroup/' + id,
        method: 'get'
    })
}

// 新增班组管理
export function addWorkgroup(data) {
    return request({
        url: '/res/workgroup',
        method: 'post',
        data: data
    })
}

// 修改班组管理
export function updateWorkgroup(data) {
    return request({
        url: '/res/workgroup',
        method: 'put',
        data: data
    })
}

// 删除班组管理
export function delWorkgroup(id) {
    return request({
        url: '/res/workgroup/' + id,
        method: 'delete'
    })
}



