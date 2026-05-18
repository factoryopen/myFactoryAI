import request from '@/utils/request'

// 查询批次工艺管理列表
export function listMlRouting(query) {
    return request({
        url: '/pln/mlRouting/list',
        method: 'get',
        params: query
    })
}

// 查询批次工艺管理详细
export function getMlRouting(id) {
    return request({
        url: '/pln/mlRouting/' + id,
        method: 'get'
    })
}

// 新增批次工艺管理
export function addMlRouting(data) {
    return request({
        url: '/pln/mlRouting',
        method: 'post',
        data: data
    })
}

// 修改批次工艺管理
export function updateMlRouting(data) {
    return request({
        url: '/pln/mlRouting',
        method: 'put',
        data: data
    })
}

// 删除批次工艺管理
export function delMlRouting(id) {
    return request({
        url: '/pln/mlRouting/' + id,
        method: 'delete'
    })
}



