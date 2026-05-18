import request from '@/utils/request'

// 查询批次作业视频列表
export function listMlVideo(query) {
    return request({
        url: '/pln/mlVideo/list',
        method: 'get',
        params: query
    })
}

// 查询批次作业视频详细
export function getMlVideo(id) {
    return request({
        url: '/pln/mlVideo/' + id,
        method: 'get'
    })
}

// 新增批次作业视频
export function addMlVideo(data) {
    return request({
        url: '/pln/mlVideo',
        method: 'post',
        data: data
    })
}

// 修改批次作业视频
export function updateMlVideo(data) {
    return request({
        url: '/pln/mlVideo',
        method: 'put',
        data: data
    })
}

// 删除批次作业视频
export function delMlVideo(id) {
    return request({
        url: '/pln/mlVideo/' + id,
        method: 'delete'
    })
}



