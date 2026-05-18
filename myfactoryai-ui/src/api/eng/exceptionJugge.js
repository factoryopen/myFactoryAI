import request from '@/utils/request'

// 查询工艺异常判处列表
export function listExceptionJugge(query) {
    return request({
        url: '/eng/exceptionJugge/list',
        method: 'get',
        params: query
    })
}

// 查询工艺异常判处详细
export function getExceptionJugge(id) {
    return request({
        url: '/eng/exceptionJugge/' + id,
        method: 'get'
    })
}

// 新增工艺异常判处
export function addExceptionJugge(data) {
    return request({
        url: '/eng/exceptionJugge',
        method: 'post',
        data: data
    })
}

// 修改工艺异常判处
export function updateExceptionJugge(data) {
    return request({
        url: '/eng/exceptionJugge',
        method: 'put',
        data: data
    })
}

// 删除工艺异常判处
export function delExceptionJugge(id) {
    return request({
        url: '/eng/exceptionJugge/' + id,
        method: 'delete'
    })
}

// 判处
export function judge(data)  {
    return request({
        url: '/eng/exceptionJugge/judge',
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

