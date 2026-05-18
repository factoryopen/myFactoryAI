import request from '@/utils/request'

// 查询产品作业视频列表
export function listPruductRoutingvideo(query) {
    return request({
        url: '/eng/pruductRoutingvideo/list',
        method: 'get',
        params: query
    })
}

// 查询产品作业视频详细
export function getPruductRoutingvideo(id) {
    return request({
        url: '/eng/pruductRoutingvideo/' + id,
        method: 'get'
    })
}

// 新增产品作业视频
export function addPruductRoutingvideo(data) {
    return request({
        url: '/eng/pruductRoutingvideo',
        method: 'post',
        data: data
    })
}

// 修改产品作业视频
export function updatePruductRoutingvideo(data) {
    return request({
        url: '/eng/pruductRoutingvideo',
        method: 'put',
        data: data
    })
}

// 删除产品作业视频
export function delPruductRoutingvideo(id) {
    return request({
        url: '/eng/pruductRoutingvideo/' + id,
        method: 'delete'
    })
}



