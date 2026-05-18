import request from '@/utils/request'

// 查询销售员预设列表
export function listSales(query) {
    return request({
        url: '/cha/sales/list',
        method: 'get',
        params: query
    })
}

// 查询销售员预设详细
export function getSales(id) {
    return request({
        url: '/cha/sales/' + id,
        method: 'get'
    })
}

// 新增销售员预设
export function addSales(data) {
    return request({
        url: '/cha/sales',
        method: 'post',
        data: data
    })
}

// 修改销售员预设
export function updateSales(data) {
    return request({
        url: '/cha/sales',
        method: 'put',
        data: data
    })
}

// 删除销售员预设
export function delSales(id) {
    return request({
        url: '/cha/sales/' + id,
        method: 'delete'
    })
}



