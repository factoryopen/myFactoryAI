import request from '@/utils/request'

// 查询工单作业视频列表
export function listWoVideo(query) {
    return request({
        url: '/pln/woVideo/list',
        method: 'get',
        params: query
    })
}

// 查询工单作业视频详细
export function getWoVideo(id) {
    return request({
        url: '/pln/woVideo/' + id,
        method: 'get'
    })
}

// 新增工单作业视频
export function addWoVideo(data) {
    return request({
        url: '/pln/woVideo',
        method: 'post',
        data: data
    })
}

// 修改工单作业视频
export function updateWoVideo(data) {
    return request({
        url: '/pln/woVideo',
        method: 'put',
        data: data
    })
}

// 删除工单作业视频
export function delWoVideo(id) {
    return request({
        url: '/pln/woVideo/' + id,
        method: 'delete'
    })
}



