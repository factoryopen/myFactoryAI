import request from '@/utils/request'

// 查询发货计划尾情列表
export function listDeliveryPlanTail(query) {
    return request({
        url: '/del/deliveryPlanTail/list',
        method: 'get',
        params: query
    })
}

// 查询发货计划尾情详细
export function getDeliveryPlanTail(id) {
    return request({
        url: '/del/deliveryPlanTail/' + id,
        method: 'get'
    })
}

// 新增发货计划尾情
export function addDeliveryPlanTail(data) {
    return request({
        url: '/del/deliveryPlanTail',
        method: 'post',
        data: data
    })
}

// 修改发货计划尾情
export function updateDeliveryPlanTail(data) {
    return request({
        url: '/del/deliveryPlanTail',
        method: 'put',
        data: data
    })
}

// 删除发货计划尾情
export function delDeliveryPlanTail(id) {
    return request({
        url: '/del/deliveryPlanTail/' + id,
        method: 'delete'
    })
}



