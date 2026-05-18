import request from '@/utils/request'

// 查询采购质量异常原因列表
export function listPexceptionReasontype(query) {
    return request({
        url: '/qua/pexceptionReasontype/list',
        method: 'get',
        params: query
    })
}

// 查询采购质量异常原因详细
export function getPexceptionReasontype(id) {
    return request({
        url: '/qua/pexceptionReasontype/' + id,
        method: 'get'
    })
}

// 新增采购质量异常原因
export function addPexceptionReasontype(data) {
    return request({
        url: '/qua/pexceptionReasontype',
        method: 'post',
        data: data
    })
}

// 修改采购质量异常原因
export function updatePexceptionReasontype(data) {
    return request({
        url: '/qua/pexceptionReasontype',
        method: 'put',
        data: data
    })
}

// 删除采购质量异常原因
export function delPexceptionReasontype(id) {
    return request({
        url: '/qua/pexceptionReasontype/' + id,
        method: 'delete'
    })
}



