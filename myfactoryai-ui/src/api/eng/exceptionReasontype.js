import request from '@/utils/request'

// 查询工艺异常原因列表
export function listExceptionReasontype(query) {
    return request({
        url: '/eng/exceptionReasontype/list',
        method: 'get',
        params: query
    })
}

// 查询工艺异常原因详细
export function getExceptionReasontype(id) {
    return request({
        url: '/eng/exceptionReasontype/' + id,
        method: 'get'
    })
}

// 新增工艺异常原因
export function addExceptionReasontype(data) {
    return request({
        url: '/eng/exceptionReasontype',
        method: 'post',
        data: data
    })
}

// 修改工艺异常原因
export function updateExceptionReasontype(data) {
    return request({
        url: '/eng/exceptionReasontype',
        method: 'put',
        data: data
    })
}

// 删除工艺异常原因
export function delExceptionReasontype(id) {
    return request({
        url: '/eng/exceptionReasontype/' + id,
        method: 'delete'
    })
}



