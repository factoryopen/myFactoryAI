import request from '@/utils/request'

// 查询污染物排放点列表
export function listPollutionPoint(query) {
    return request({
        url: '/ehs/pollutionPoint/list',
        method: 'get',
        params: query
    })
}

// 查询污染物排放点详细
export function getPollutionPoint(id) {
    return request({
        url: '/ehs/pollutionPoint/' + id,
        method: 'get'
    })
}

// 新增污染物排放点
export function addPollutionPoint(data) {
    return request({
        url: '/ehs/pollutionPoint',
        method: 'post',
        data: data
    })
}

// 修改污染物排放点
export function updatePollutionPoint(data) {
    return request({
        url: '/ehs/pollutionPoint',
        method: 'put',
        data: data
    })
}

// 删除污染物排放点
export function delPollutionPoint(id) {
    return request({
        url: '/ehs/pollutionPoint/' + id,
        method: 'delete'
    })
}



