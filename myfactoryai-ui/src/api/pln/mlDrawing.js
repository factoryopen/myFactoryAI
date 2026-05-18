import request from '@/utils/request'

// 查询批次图纸列表
export function listMlDrawing(query) {
    return request({
        url: '/pln/mlDrawing/list',
        method: 'get',
        params: query
    })
}

// 查询批次图纸详细
export function getMlDrawing(id) {
    return request({
        url: '/pln/mlDrawing/' + id,
        method: 'get'
    })
}

// 新增批次图纸
export function addMlDrawing(data) {
    return request({
        url: '/pln/mlDrawing',
        method: 'post',
        data: data
    })
}

// 修改批次图纸
export function updateMlDrawing(data) {
    return request({
        url: '/pln/mlDrawing',
        method: 'put',
        data: data
    })
}

// 删除批次图纸
export function delMlDrawing(id) {
    return request({
        url: '/pln/mlDrawing/' + id,
        method: 'delete'
    })
}



