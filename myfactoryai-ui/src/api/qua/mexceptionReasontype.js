import request from '@/utils/request'

// 查询异常原因分类列表
export function listMexceptionReasontype(query) {
    return request({
        url: '/qua/mexceptionReasontype/list',
        method: 'get',
        params: query
    })
}

// 查询异常原因分类详细
export function getMexceptionReasontype(id) {
    return request({
        url: '/qua/mexceptionReasontype/' + id,
        method: 'get'
    })
}

// 新增异常原因分类
export function addMexceptionReasontype(data) {
    return request({
        url: '/qua/mexceptionReasontype',
        method: 'post',
        data: data
    })
}

// 修改异常原因分类
export function updateMexceptionReasontype(data) {
    return request({
        url: '/qua/mexceptionReasontype',
        method: 'put',
        data: data
    })
}

// 删除异常原因分类
export function delMexceptionReasontype(id) {
    return request({
        url: '/qua/mexceptionReasontype/' + id,
        method: 'delete'
    })
}



