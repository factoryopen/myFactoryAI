import request from '@/utils/request'

// 查询工单图纸列表
export function listWoDrawing(query) {
    return request({
        url: '/pln/woDrawing/list',
        method: 'get',
        params: query
    })
}

// 查询工单图纸详细
export function getWoDrawing(id) {
    return request({
        url: '/pln/woDrawing/' + id,
        method: 'get'
    })
}

// 新增工单图纸
export function addWoDrawing(data) {
    return request({
        url: '/pln/woDrawing',
        method: 'post',
        data: data
    })
}

// 修改工单图纸
export function updateWoDrawing(data) {
    return request({
        url: '/pln/woDrawing',
        method: 'put',
        data: data
    })
}

// 删除工单图纸
export function delWoDrawing(id) {
    return request({
        url: '/pln/woDrawing/' + id,
        method: 'delete'
    })
}



