import request from '@/utils/request'

// 查询产品作业视频列表
export function listWoRoutingvideo(query) {
    return request({
        url: '/pln/woRoutingvideo/list',
        method: 'get',
        params: query
    })
}

// 查询产品作业视频详细
export function getWoRoutingvideo(id) {
    return request({
        url: '/pln/woRoutingvideo/' + id,
        method: 'get'
    })
}

// 新增产品作业视频
export function addWoRoutingvideo(data) {
    return request({
        url: '/pln/woRoutingvideo',
        method: 'post',
        data: data
    })
}

// 修改产品作业视频
export function updateWoRoutingvideo(data) {
    return request({
        url: '/pln/woRoutingvideo',
        method: 'put',
        data: data
    })
}

// 删除产品作业视频
export function delWoRoutingvideo(id) {
    return request({
        url: '/pln/woRoutingvideo/' + id,
        method: 'delete'
    })
}



