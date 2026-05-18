import request from '@/utils/request'

// 查询异常原因分类列表
export function listExceptionReasontype(query) {
    return request({
        url: '/qua/exceptionReasontype/list',
        method: 'get',
        params: query
    })
}

// 查询异常原因分类详细
export function getExceptionReasontype(id) {
    return request({
        url: '/qua/exceptionReasontype/' + id,
        method: 'get'
    })
}

// 新增异常原因分类
export function addExceptionReasontype(data) {
    return request({
        url: '/qua/exceptionReasontype',
        method: 'post',
        data: data
    })
}

// 修改异常原因分类
export function updateExceptionReasontype(data) {
    return request({
        url: '/qua/exceptionReasontype',
        method: 'put',
        data: data
    })
}

// 删除异常原因分类
export function delExceptionReasontype(id) {
    return request({
        url: '/qua/exceptionReasontype/' + id,
        method: 'delete'
    })
}



