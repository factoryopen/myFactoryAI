import request from '@/utils/request'

// 查询工序移转记录列表
export function listProcessMoves(query) {
    return request({
        url: '/exe/processMoves/list',
        method: 'get',
        params: query
    })
}

// 查询工序移转记录详细
export function getProcessMoves(id) {
    return request({
        url: '/exe/processMoves/' + id,
        method: 'get'
    })
}

// 新增工序移转记录
export function addProcessMoves(data) {
    return request({
        url: '/exe/processMoves',
        method: 'post',
        data: data
    })
}

// 修改工序移转记录
export function updateProcessMoves(data) {
    return request({
        url: '/exe/processMoves',
        method: 'put',
        data: data
    })
}

// 删除工序移转记录
export function delProcessMoves(id) {
    return request({
        url: '/exe/processMoves/' + id,
        method: 'delete'
    })
}



