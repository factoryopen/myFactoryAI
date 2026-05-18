import request from '@/utils/request'

// 查询产线管理列表
export function listLine(query) {
    return request({
        url: '/res/line/list',
        method: 'get',
        params: query
    })
}

// 查询产线管理详细
export function getLine(id) {
    return request({
        url: '/res/line/' + id,
        method: 'get'
    })
}

// 新增产线管理
export function addLine(data) {
    return request({
        url: '/res/line',
        method: 'post',
        data: data
    })
}

// 修改产线管理
export function updateLine(data) {
    return request({
        url: '/res/line',
        method: 'put',
        data: data
    })
}

// 删除产线管理
export function delLine(id) {
    return request({
        url: '/res/line/' + id,
        method: 'delete'
    })
}



