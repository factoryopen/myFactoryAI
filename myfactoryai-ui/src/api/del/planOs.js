import request from '@/utils/request'

// 查询外协计划列表
export function listPlanOs(query) {
    return request({
        url: '/del/planOs/list',
        method: 'get',
        params: query
    })
}

// 查询外协计划详细
export function getPlanOs(id) {
    return request({
        url: '/del/planOs/' + id,
        method: 'get'
    })
}

// 新增外协计划
export function addPlanOs(data) {
    return request({
        url: '/del/planOs',
        method: 'post',
        data: data
    })
}

// 修改外协计划
export function updatePlanOs(data) {
    return request({
        url: '/del/planOs',
        method: 'put',
        data: data
    })
}

// 删除外协计划
export function delPlanOs(id) {
    return request({
        url: '/del/planOs/' + id,
        method: 'delete'
    })
}




// 订单号
export function getNextBillno(billCode) {
    return request({
        url: '/tool/billManager/' + billCode,
        method: 'get'
    })
}

export function updateBillSeq(billCode) {
    return request({
        url: '/tool/billManager/' + billCode,
        method: 'put'
    })
}

