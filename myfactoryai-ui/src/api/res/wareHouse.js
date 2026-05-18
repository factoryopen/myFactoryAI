import request from '@/utils/request'

// 查询仓库管理列表
export function listWareHouse(query) {
    return request({
        url: '/res/wareHouse/list',
        method: 'get',
        params: query
    })
}

// 查询仓库管理详细
export function getWareHouse(id) {
    return request({
        url: '/res/wareHouse/' + id,
        method: 'get'
    })
}

// 新增仓库管理
export function addWareHouse(data) {
    return request({
        url: '/res/wareHouse',
        method: 'post',
        data: data
    })
}

// 修改仓库管理
export function updateWareHouse(data) {
    return request({
        url: '/res/wareHouse',
        method: 'put',
        data: data
    })
}

// 删除仓库管理
export function delWareHouse(id) {
    return request({
        url: '/res/wareHouse/' + id,
        method: 'delete'
    })
}



