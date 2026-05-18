import request from '@/utils/request'

// 查询安全风险处理列表
export function listHazardDeal(query) {
    return request({
        url: '/ehs/hazardDeal/list',
        method: 'get',
        params: query
    })
}

// 查询安全风险处理详细
export function getHazardDeal(id) {
    return request({
        url: '/ehs/hazardDeal/' + id,
        method: 'get'
    })
}

// 新增安全风险处理
export function addHazardDeal(data) {
    return request({
        url: '/ehs/hazardDeal',
        method: 'post',
        data: data
    })
}

// 修改安全风险处理
export function updateHazardDeal(data) {
    return request({
        url: '/ehs/hazardDeal',
        method: 'put',
        data: data
    })
}

// 删除安全风险处理
export function delHazardDeal(id) {
    return request({
        url: '/ehs/hazardDeal/' + id,
        method: 'delete'
    })
}



