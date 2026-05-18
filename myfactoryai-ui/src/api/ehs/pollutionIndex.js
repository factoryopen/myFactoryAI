import request from '@/utils/request'

// 查询污染排放指标列表
export function listPollutionIndex(query) {
    return request({
        url: '/ehs/pollutionIndex/list',
        method: 'get',
        params: query
    })
}

// 查询污染排放指标详细
export function getPollutionIndex(id) {
    return request({
        url: '/ehs/pollutionIndex/' + id,
        method: 'get'
    })
}

// 新增污染排放指标
export function addPollutionIndex(data) {
    return request({
        url: '/ehs/pollutionIndex',
        method: 'post',
        data: data
    })
}

// 修改污染排放指标
export function updatePollutionIndex(data) {
    return request({
        url: '/ehs/pollutionIndex',
        method: 'put',
        data: data
    })
}

// 删除污染排放指标
export function delPollutionIndex(id) {
    return request({
        url: '/ehs/pollutionIndex/' + id,
        method: 'delete'
    })
}



