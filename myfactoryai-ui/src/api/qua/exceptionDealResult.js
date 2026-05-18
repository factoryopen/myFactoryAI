import request from '@/utils/request'

// 查询质量异常判处结果列表
export function listExceptionDealResult(query) {
    return request({
        url: '/qua/exceptionDealResult/list',
        method: 'get',
        params: query
    })
}

// 查询质量异常判处结果详细
export function getExceptionDealResult(id) {
    return request({
        url: '/qua/exceptionDealResult/' + id,
        method: 'get'
    })
}

// 新增质量异常判处结果
export function addExceptionDealResult(data) {
    return request({
        url: '/qua/exceptionDealResult',
        method: 'post',
        data: data
    })
}

// 修改质量异常判处结果
export function updateExceptionDealResult(data) {
    return request({
        url: '/qua/exceptionDealResult',
        method: 'put',
        data: data
    })
}

// 删除质量异常判处结果
export function delExceptionDealResult(id) {
    return request({
        url: '/qua/exceptionDealResult/' + id,
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

