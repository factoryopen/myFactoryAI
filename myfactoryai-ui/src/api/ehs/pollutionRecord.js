import request from '@/utils/request'

// 查询污染物排放登记列表
export function listPollutionRecord(query) {
    return request({
        url: '/ehs/pollutionRecord/list',
        method: 'get',
        params: query
    })
}

// 查询污染物排放登记详细
export function getPollutionRecord(id) {
    return request({
        url: '/ehs/pollutionRecord/' + id,
        method: 'get'
    })
}

// 新增污染物排放登记
export function addPollutionRecord(data) {
    return request({
        url: '/ehs/pollutionRecord',
        method: 'post',
        data: data
    })
}

// 修改污染物排放登记
export function updatePollutionRecord(data) {
    return request({
        url: '/ehs/pollutionRecord',
        method: 'put',
        data: data
    })
}

// 删除污染物排放登记
export function delPollutionRecord(id) {
    return request({
        url: '/ehs/pollutionRecord/' + id,
        method: 'delete'
    })
}



