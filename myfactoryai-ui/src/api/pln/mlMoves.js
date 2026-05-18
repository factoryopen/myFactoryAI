import request from '@/utils/request'

// 查询批次移转记录列表
export function listMlMoves(query) {
    return request({
        url: '/pln/mlMoves/list',
        method: 'get',
        params: query
    })
}

// 查询批次移转记录详细
export function getMlMoves(id) {
    return request({
        url: '/pln/mlMoves/' + id,
        method: 'get'
    })
}

// 新增批次移转记录
export function addMlMoves(data) {
    return request({
        url: '/pln/mlMoves',
        method: 'post',
        data: data
    })
}

// 修改批次移转记录
export function updateMlMoves(data) {
    return request({
        url: '/pln/mlMoves',
        method: 'put',
        data: data
    })
}

// 删除批次移转记录
export function delMlMoves(id) {
    return request({
        url: '/pln/mlMoves/' + id,
        method: 'delete'
    })
}



