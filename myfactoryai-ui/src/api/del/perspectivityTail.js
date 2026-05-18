import request from '@/utils/request'

// 查询订单透视尾情列表
export function listPerspectivityTail(query) {
    return request({
        url: '/del/perspectivityTail/list',
        method: 'get',
        params: query
    })
}

// 查询订单透视尾情详细
export function getPerspectivityTail(id) {
    return request({
        url: '/del/perspectivityTail/' + id,
        method: 'get'
    })
}

// 新增订单透视尾情
export function addPerspectivityTail(data) {
    return request({
        url: '/del/perspectivityTail',
        method: 'post',
        data: data
    })
}

// 修改订单透视尾情
export function updatePerspectivityTail(data) {
    return request({
        url: '/del/perspectivityTail',
        method: 'put',
        data: data
    })
}

// 删除订单透视尾情
export function delPerspectivityTail(id) {
    return request({
        url: '/del/perspectivityTail/' + id,
        method: 'delete'
    })
}



