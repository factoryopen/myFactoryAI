import request from '@/utils/request'

// 查询作业类型列表
export function listOperationType(query) {
    return request({
        url: '/bas/operationType/list',
        method: 'get',
        params: query
    })
}

// 查询作业类型详细
export function getOperationType(id) {
    return request({
        url: '/bas/operationType/' + id,
        method: 'get'
    })
}

// 新增作业类型
export function addOperationType(data) {
    return request({
        url: '/bas/operationType',
        method: 'post',
        data: data
    })
}

// 修改作业类型
export function updateOperationType(data) {
    return request({
        url: '/bas/operationType',
        method: 'put',
        data: data
    })
}

// 删除作业类型
export function delOperationType(id) {
    return request({
        url: '/bas/operationType/' + id,
        method: 'delete'
    })
}



