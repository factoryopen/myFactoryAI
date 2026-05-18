import request from '@/utils/request'

// 查询工单BOM列表
export function listWoBom(query) {
    return request({
        url: '/pln/woBom/list',
        method: 'get',
        params: query
    })
}

// 查询工单BOM详细
export function getWoBom(id) {
    return request({
        url: '/pln/woBom/' + id,
        method: 'get'
    })
}

// 新增工单BOM
export function addWoBom(data) {
    return request({
        url: '/pln/woBom',
        method: 'post',
        data: data
    })
}

// 修改工单BOM
export function updateWoBom(data) {
    return request({
        url: '/pln/woBom',
        method: 'put',
        data: data
    })
}

// 删除工单BOM
export function delWoBom(id) {
    return request({
        url: '/pln/woBom/' + id,
        method: 'delete'
    })
}



