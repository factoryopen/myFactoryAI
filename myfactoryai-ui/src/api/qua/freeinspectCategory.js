import request from '@/utils/request'

// 查询免检品类列表
export function listFreeinspectCategory(query) {
    return request({
        url: '/qua/freeinspectCategory/list',
        method: 'get',
        params: query
    })
}

// 查询免检品类详细
export function getFreeinspectCategory(id) {
    return request({
        url: '/qua/freeinspectCategory/' + id,
        method: 'get'
    })
}

// 新增免检品类
export function addFreeinspectCategory(data) {
    return request({
        url: '/qua/freeinspectCategory',
        method: 'post',
        data: data
    })
}

// 修改免检品类
export function updateFreeinspectCategory(data) {
    return request({
        url: '/qua/freeinspectCategory',
        method: 'put',
        data: data
    })
}

// 删除免检品类
export function delFreeinspectCategory(id) {
    return request({
        url: '/qua/freeinspectCategory/' + id,
        method: 'delete'
    })
}



