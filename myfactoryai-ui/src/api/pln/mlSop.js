import request from '@/utils/request'

// 查询批次SOP列表
export function listMlSop(query) {
    return request({
        url: '/pln/mlSop/list',
        method: 'get',
        params: query
    })
}

// 查询批次SOP详细
export function getMlSop(id) {
    return request({
        url: '/pln/mlSop/' + id,
        method: 'get'
    })
}

// 新增批次SOP
export function addMlSop(data) {
    return request({
        url: '/pln/mlSop',
        method: 'post',
        data: data
    })
}

// 修改批次SOP
export function updateMlSop(data) {
    return request({
        url: '/pln/mlSop',
        method: 'put',
        data: data
    })
}

// 删除批次SOP
export function delMlSop(id) {
    return request({
        url: '/pln/mlSop/' + id,
        method: 'delete'
    })
}



