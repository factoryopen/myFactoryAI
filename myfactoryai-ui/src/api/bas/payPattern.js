import request from '@/utils/request'

// 查询付款方式列表
export function listPayPattern(query) {
    return request({
        url: '/bas/payPattern/list',
        method: 'get',
        params: query
    })
}

// 查询付款方式详细
export function getPayPattern(id) {
    return request({
        url: '/bas/payPattern/' + id,
        method: 'get'
    })
}

// 新增付款方式
export function addPayPattern(data) {
    return request({
        url: '/bas/payPattern',
        method: 'post',
        data: data
    })
}

// 修改付款方式
export function updatePayPattern(data) {
    return request({
        url: '/bas/payPattern',
        method: 'put',
        data: data
    })
}

// 删除付款方式
export function delPayPattern(id) {
    return request({
        url: '/bas/payPattern/' + id,
        method: 'delete'
    })
}



