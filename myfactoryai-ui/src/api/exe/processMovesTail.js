import request from '@/utils/request'

// 查询工序移转记尾情列表
export function listProcessMovesTail(query) {
    return request({
        url: '/exe/processMovesTail/list',
        method: 'get',
        params: query
    })
}

// 查询工序移转记尾情详细
export function getProcessMovesTail(id) {
    return request({
        url: '/exe/processMovesTail/' + id,
        method: 'get'
    })
}

// 新增工序移转记尾情
export function addProcessMovesTail(data) {
    return request({
        url: '/exe/processMovesTail',
        method: 'post',
        data: data
    })
}

// 修改工序移转记尾情
export function updateProcessMovesTail(data) {
    return request({
        url: '/exe/processMovesTail',
        method: 'put',
        data: data
    })
}

// 删除工序移转记尾情
export function delProcessMovesTail(id) {
    return request({
        url: '/exe/processMovesTail/' + id,
        method: 'delete'
    })
}



