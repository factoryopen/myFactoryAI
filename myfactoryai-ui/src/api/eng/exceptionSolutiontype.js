import request from '@/utils/request'

// 查询工艺异常处理类型列表
export function listExceptionSolutiontype(query) {
    return request({
        url: '/eng/exceptionSolutiontype/list',
        method: 'get',
        params: query
    })
}

// 查询工艺异常处理类型详细
export function getExceptionSolutiontype(id) {
    return request({
        url: '/eng/exceptionSolutiontype/' + id,
        method: 'get'
    })
}

// 新增工艺异常处理类型
export function addExceptionSolutiontype(data) {
    return request({
        url: '/eng/exceptionSolutiontype',
        method: 'post',
        data: data
    })
}

// 修改工艺异常处理类型
export function updateExceptionSolutiontype(data) {
    return request({
        url: '/eng/exceptionSolutiontype',
        method: 'put',
        data: data
    })
}

// 删除工艺异常处理类型
export function delExceptionSolutiontype(id) {
    return request({
        url: '/eng/exceptionSolutiontype/' + id,
        method: 'delete'
    })
}



