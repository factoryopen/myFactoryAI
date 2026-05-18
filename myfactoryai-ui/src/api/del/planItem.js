import request from '@/utils/request'

// 查询发货计划列表
export function listPlanItem(query) {
    return request({
        url: '/del/planItem/list',
        method: 'get',
        params: query
    })
}

// 查询发货计划详细
export function getPlanItem(id) {
    return request({
        url: '/del/planItem/' + id,
        method: 'get'
    })
}

// 新增发货计划
export function addPlanItem(data) {
    return request({
        url: '/del/planItem',
        method: 'post',
        data: data
    })
}

// 修改发货计划
export function updatePlanItem(data) {
    return request({
        url: '/del/planItem',
        method: 'put',
        data: data
    })
}

// 删除发货计划
export function delPlanItem(id) {
    return request({
        url: '/del/planItem/' + id,
        method: 'delete'
    })
}



