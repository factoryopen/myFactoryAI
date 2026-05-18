import request from '@/utils/request'

// 查询安全风险登记列表
export function listHazardRecord(query) {
    return request({
        url: '/ehs/hazardRecord/list',
        method: 'get',
        params: query
    })
}

// 查询安全风险登记详细
export function getHazardRecord(id) {
    return request({
        url: '/ehs/hazardRecord/' + id,
        method: 'get'
    })
}

// 新增安全风险登记
export function addHazardRecord(data) {
    return request({
        url: '/ehs/hazardRecord',
        method: 'post',
        data: data
    })
}

// 修改安全风险登记
export function updateHazardRecord(data) {
    return request({
        url: '/ehs/hazardRecord',
        method: 'put',
        data: data
    })
}

// 删除安全风险登记
export function delHazardRecord(id) {
    return request({
        url: '/ehs/hazardRecord/' + id,
        method: 'delete'
    })
}



