import request from '@/utils/request'

// 查询历史移转查询列表
export function listMlMoves(query) {
    return request({
        url: '/exe/mlMoves/list',
        method: 'get',
        params: query
    })
}

// 查询历史移转查询详细
export function getMlMoves(id) {
    return request({
        url: '/exe/mlMoves/' + id,
        method: 'get'
    })
}

// 新增历史移转查询
export function addMlMoves(data) {
    return request({
        url: '/exe/mlMoves',
        method: 'post',
        data: data
    })
}

// 修改历史移转查询
export function updateMlMoves(data) {
    return request({
        url: '/exe/mlMoves',
        method: 'put',
        data: data
    })
}

// 删除历史移转查询
export function delMlMoves(id) {
    return request({
        url: '/exe/mlMoves/' + id,
        method: 'delete'
    })
}



