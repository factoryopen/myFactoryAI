import request from '@/utils/request'

// 查询订单透视表列表
export function listPerspectivity(query) {
    return request({
        url: '/del/perspectivity/list',
        method: 'get',
        params: query
    })
}

// 查询订单透视表详细
export function getPerspectivity(id) {
    return request({
        url: '/del/perspectivity/' + id,
        method: 'get'
    })
}

// 新增订单透视表
export function addPerspectivity(data) {
    return request({
        url: '/del/perspectivity',
        method: 'post',
        data: data
    })
}

// 修改订单透视表
export function updatePerspectivity(data) {
    return request({
        url: '/del/perspectivity',
        method: 'put',
        data: data
    })
}

// 删除订单透视表
export function delPerspectivity(id) {
    return request({
        url: '/del/perspectivity/' + id,
        method: 'delete'
    })
}

// 透算
export function calculatePerspectivity()  {
    return request({
        url: '/del/perspectivity/calculatePerspectivity',
        method: 'put',
    })
}


