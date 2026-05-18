import request from '@/utils/request'

// 查询出入库请求明细列表
export function listStockRequestItem(query) {
    return request({
        url: '/snc/stockRequestItem/list',
        method: 'get',
        params: query
    })
}

// 查询出入库请求明细详细
export function getStockRequestItem(id) {
    return request({
        url: '/snc/stockRequestItem/' + id,
        method: 'get'
    })
}

// 新增出入库请求明细
export function addStockRequestItem(data) {
    return request({
        url: '/snc/stockRequestItem',
        method: 'post',
        data: data
    })
}

// 修改出入库请求明细
export function updateStockRequestItem(data) {
    return request({
        url: '/snc/stockRequestItem',
        method: 'put',
        data: data
    })
}

// 删除出入库请求明细
export function delStockRequestItem(id) {
    return request({
        url: '/snc/stockRequestItem/' + id,
        method: 'delete'
    })
}



