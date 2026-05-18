import request from '@/utils/request'

// 查询库存总览表列表
export function listInventorySummary(query) {
    return request({
        url: '/snc/inventorySummary/list',
        method: 'get',
        params: query
    })
}

// 查询库存总览表详细
export function getInventorySummary(id) {
    return request({
        url: '/snc/inventorySummary/' + id,
        method: 'get'
    })
}

// 新增库存总览表
export function addInventorySummary(data) {
    return request({
        url: '/snc/inventorySummary',
        method: 'post',
        data: data
    })
}

// 修改库存总览表
export function updateInventorySummary(data) {
    return request({
        url: '/snc/inventorySummary',
        method: 'put',
        data: data
    })
}

// 删除库存总览表
export function delInventorySummary(id) {
    return request({
        url: '/snc/inventorySummary/' + id,
        method: 'delete'
    })
}

// 刷期
export function refreshExpired(data)  {
    return request({
        url: '/snc/inventorySummary/refreshExpired',
        method: 'put',
        data: data
    })
}


