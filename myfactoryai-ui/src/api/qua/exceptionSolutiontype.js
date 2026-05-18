import request from '@/utils/request'

// 查询质量异常处理类型列表
export function listExceptionSolutiontype(query) {
    return request({
        url: '/qua/exceptionSolutiontype/list',
        method: 'get',
        params: query
    })
}

// 查询质量异常处理类型详细
export function getExceptionSolutiontype(id) {
    return request({
        url: '/qua/exceptionSolutiontype/' + id,
        method: 'get'
    })
}

// 新增质量异常处理类型
export function addExceptionSolutiontype(data) {
    return request({
        url: '/qua/exceptionSolutiontype',
        method: 'post',
        data: data
    })
}

// 修改质量异常处理类型
export function updateExceptionSolutiontype(data) {
    return request({
        url: '/qua/exceptionSolutiontype',
        method: 'put',
        data: data
    })
}

// 删除质量异常处理类型
export function delExceptionSolutiontype(id) {
    return request({
        url: '/qua/exceptionSolutiontype/' + id,
        method: 'delete'
    })
}



