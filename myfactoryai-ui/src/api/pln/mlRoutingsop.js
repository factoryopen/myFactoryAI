import request from '@/utils/request'

// 查询批次SOP列表
export function listMlRoutingsop(query) {
    return request({
        url: '/pln/mlRoutingsop/list',
        method: 'get',
        params: query
    })
}

// 查询批次SOP详细
export function getMlRoutingsop(id) {
    return request({
        url: '/pln/mlRoutingsop/' + id,
        method: 'get'
    })
}

// 新增批次SOP
export function addMlRoutingsop(data) {
    return request({
        url: '/pln/mlRoutingsop',
        method: 'post',
        data: data
    })
}

// 修改批次SOP
export function updateMlRoutingsop(data) {
    return request({
        url: '/pln/mlRoutingsop',
        method: 'put',
        data: data
    })
}

// 删除批次SOP
export function delMlRoutingsop(id) {
    return request({
        url: '/pln/mlRoutingsop/' + id,
        method: 'delete'
    })
}



