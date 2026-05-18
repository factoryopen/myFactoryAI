import request from '@/utils/request'

// 查询产品作业视频列表
export function listPruductVideo(query) {
    return request({
        url: '/eng/pruductVideo/list',
        method: 'get',
        params: query
    })
}

// 查询产品作业视频详细
export function getPruductVideo(id) {
    return request({
        url: '/eng/pruductVideo/' + id,
        method: 'get'
    })
}

// 新增产品作业视频
export function addPruductVideo(data) {
    return request({
        url: '/eng/pruductVideo',
        method: 'post',
        data: data
    })
}

// 修改产品作业视频
export function updatePruductVideo(data) {
    return request({
        url: '/eng/pruductVideo',
        method: 'put',
        data: data
    })
}

// 删除产品作业视频
export function delPruductVideo(id) {
    return request({
        url: '/eng/pruductVideo/' + id,
        method: 'delete'
    })
}



