import request from '@/utils/request'

// 查询污染排放分类列表
export function listPollutionCategory(query) {
    return request({
        url: '/ehs/pollutionCategory/list',
        method: 'get',
        params: query
    })
}

// 查询污染排放分类详细
export function getPollutionCategory(id) {
    return request({
        url: '/ehs/pollutionCategory/' + id,
        method: 'get'
    })
}

// 新增污染排放分类
export function addPollutionCategory(data) {
    return request({
        url: '/ehs/pollutionCategory',
        method: 'post',
        data: data
    })
}

// 修改污染排放分类
export function updatePollutionCategory(data) {
    return request({
        url: '/ehs/pollutionCategory',
        method: 'put',
        data: data
    })
}

// 删除污染排放分类
export function delPollutionCategory(id) {
    return request({
        url: '/ehs/pollutionCategory/' + id,
        method: 'delete'
    })
}



