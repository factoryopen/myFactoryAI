import request from '@/utils/request'

// 查询批次作业视频列表
export function listMlRoutingvideo(query) {
    return request({
        url: '/pln/mlRoutingvideo/list',
        method: 'get',
        params: query
    })
}

// 查询批次作业视频详细
export function getMlRoutingvideo(id) {
    return request({
        url: '/pln/mlRoutingvideo/' + id,
        method: 'get'
    })
}

// 新增批次作业视频
export function addMlRoutingvideo(data) {
    return request({
        url: '/pln/mlRoutingvideo',
        method: 'post',
        data: data
    })
}

// 修改批次作业视频
export function updateMlRoutingvideo(data) {
    return request({
        url: '/pln/mlRoutingvideo',
        method: 'put',
        data: data
    })
}

// 删除批次作业视频
export function delMlRoutingvideo(id) {
    return request({
        url: '/pln/mlRoutingvideo/' + id,
        method: 'delete'
    })
}



