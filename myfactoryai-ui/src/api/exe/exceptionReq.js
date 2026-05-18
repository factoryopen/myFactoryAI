import request from '@/utils/request'

// 查询工艺异常登记列表
export function listExceptionReq(query) {
    return request({
        url: '/exe/exceptionReq/list',
        method: 'get',
        params: query
    })
}

// 查询工艺异常登记详细
export function getExceptionReq(id) {
    return request({
        url: '/exe/exceptionReq/' + id,
        method: 'get'
    })
}

// 新增工艺异常登记
export function addExceptionReq(data) {
    return request({
        url: '/exe/exceptionReq',
        method: 'post',
        data: data
    })
}

// 修改工艺异常登记
export function updateExceptionReq(data) {
    return request({
        url: '/exe/exceptionReq',
        method: 'put',
        data: data
    })
}

// 删除工艺异常登记
export function delExceptionReq(id) {
    return request({
        url: '/exe/exceptionReq/' + id,
        method: 'delete'
    })
}

// 请判
export function requestDeal(id)  {
    return request({
        url: '/exe/exceptionReq/requestDeal/'+ id,
        method: 'put'
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

