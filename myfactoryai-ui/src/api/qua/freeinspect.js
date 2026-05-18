import request from '@/utils/request'

// 查询免检策略管理列表
export function listFreeinspect(query) {
    return request({
        url: '/qua/freeinspect/list',
        method: 'get',
        params: query
    })
}

// 查询免检策略管理详细
export function getFreeinspect(id) {
    return request({
        url: '/qua/freeinspect/' + id,
        method: 'get'
    })
}

// 新增免检策略管理
export function addFreeinspect(data) {
    return request({
        url: '/qua/freeinspect',
        method: 'post',
        data: data
    })
}

// 修改免检策略管理
export function updateFreeinspect(data) {
    return request({
        url: '/qua/freeinspect',
        method: 'put',
        data: data
    })
}

// 删除免检策略管理
export function delFreeinspect(id) {
    return request({
        url: '/qua/freeinspect/' + id,
        method: 'delete'
    })
}



