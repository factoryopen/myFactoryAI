import request from '@/utils/request'

// 查询采购质量异常处理类型列表
export function listPexceptionSolutiontype(query) {
    return request({
        url: '/qua/pexceptionSolutiontype/list',
        method: 'get',
        params: query
    })
}

// 查询采购质量异常处理类型详细
export function getPexceptionSolutiontype(id) {
    return request({
        url: '/qua/pexceptionSolutiontype/' + id,
        method: 'get'
    })
}

// 新增采购质量异常处理类型
export function addPexceptionSolutiontype(data) {
    return request({
        url: '/qua/pexceptionSolutiontype',
        method: 'post',
        data: data
    })
}

// 修改采购质量异常处理类型
export function updatePexceptionSolutiontype(data) {
    return request({
        url: '/qua/pexceptionSolutiontype',
        method: 'put',
        data: data
    })
}

// 删除采购质量异常处理类型
export function delPexceptionSolutiontype(id) {
    return request({
        url: '/qua/pexceptionSolutiontype/' + id,
        method: 'delete'
    })
}



