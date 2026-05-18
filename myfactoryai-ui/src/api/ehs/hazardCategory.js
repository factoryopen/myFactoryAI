import request from '@/utils/request'

// 查询安全风险分类列表
export function listHazardCategory(query) {
    return request({
        url: '/ehs/hazardCategory/list',
        method: 'get',
        params: query
    })
}

// 查询安全风险分类详细
export function getHazardCategory(id) {
    return request({
        url: '/ehs/hazardCategory/' + id,
        method: 'get'
    })
}

// 新增安全风险分类
export function addHazardCategory(data) {
    return request({
        url: '/ehs/hazardCategory',
        method: 'post',
        data: data
    })
}

// 修改安全风险分类
export function updateHazardCategory(data) {
    return request({
        url: '/ehs/hazardCategory',
        method: 'put',
        data: data
    })
}

// 删除安全风险分类
export function delHazardCategory(id) {
    return request({
        url: '/ehs/hazardCategory/' + id,
        method: 'delete'
    })
}



