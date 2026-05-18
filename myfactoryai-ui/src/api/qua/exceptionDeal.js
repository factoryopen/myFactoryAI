import request from '@/utils/request'

// 查询质量异常判处列表
export function listExceptionDeal(query) {
    return request({
        url: '/qua/exceptionDeal/list',
        method: 'get',
        params: query
    })
}

// 查询质量异常判处详细
export function getExceptionDeal(id) {
    return request({
        url: '/qua/exceptionDeal/' + id,
        method: 'get'
    })
}

// 新增质量异常判处
export function addExceptionDeal(data) {
    return request({
        url: '/qua/exceptionDeal',
        method: 'post',
        data: data
    })
}

// 修改质量异常判处
export function updateExceptionDeal(data) {
    return request({
        url: '/qua/exceptionDeal',
        method: 'put',
        data: data
    })
}

// 删除质量异常判处
export function delExceptionDeal(id) {
    return request({
        url: '/qua/exceptionDeal/' + id,
        method: 'delete'
    })
}

// 判处
export function judge(data)  {
    return request({
        url: '/qua/exceptionDeal/judge',
        method: 'put',
        data: data
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

