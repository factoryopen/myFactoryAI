import request from '@/utils/request'

// 查询订单明细列表
export function listSoItem(query) {
    return request({
        url: '/ord/soItem/list',
        method: 'get',
        params: query
    })
}

// 查询订单明细详细
export function getSoItem(id) {
    return request({
        url: '/ord/soItem/' + id,
        method: 'get'
    })
}

// 新增订单明细
export function addSoItem(data) {
    return request({
        url: '/ord/soItem',
        method: 'post',
        data: data
    })
}

// 修改订单明细
export function updateSoItem(data) {
    return request({
        url: '/ord/soItem',
        method: 'put',
        data: data
    })
}

// 删除订单明细
export function delSoItem(id) {
    return request({
        url: '/ord/soItem/' + id,
        method: 'delete'
    })
}



