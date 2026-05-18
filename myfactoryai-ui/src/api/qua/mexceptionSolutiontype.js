import request from '@/utils/request'

// 查询质量异常处理类型列表
export function listMexceptionSolutiontype(query) {
    return request({
        url: '/qua/mexceptionSolutiontype/list',
        method: 'get',
        params: query
    })
}

// 查询质量异常处理类型详细
export function getMexceptionSolutiontype(id) {
    return request({
        url: '/qua/mexceptionSolutiontype/' + id,
        method: 'get'
    })
}

// 新增质量异常处理类型
export function addMexceptionSolutiontype(data) {
    return request({
        url: '/qua/mexceptionSolutiontype',
        method: 'post',
        data: data
    })
}

// 修改质量异常处理类型
export function updateMexceptionSolutiontype(data) {
    return request({
        url: '/qua/mexceptionSolutiontype',
        method: 'put',
        data: data
    })
}

// 删除质量异常处理类型
export function delMexceptionSolutiontype(id) {
    return request({
        url: '/qua/mexceptionSolutiontype/' + id,
        method: 'delete'
    })
}



