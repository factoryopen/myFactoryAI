import request from '@/utils/request'

// 查询产成品入库列表
export function listMlStockin(query) {
    return request({
        url: '/exe/mlStockin/list',
        method: 'get',
        params: query
    })
}

// 查询产成品入库详细
export function getMlStockin(id) {
    return request({
        url: '/exe/mlStockin/' + id,
        method: 'get'
    })
}

// 新增产成品入库
export function addMlStockin(data) {
    return request({
        url: '/exe/mlStockin',
        method: 'post',
        data: data
    })
}

// 修改产成品入库
export function updateMlStockin(data) {
    return request({
        url: '/exe/mlStockin',
        method: 'put',
        data: data
    })
}

// 删除产成品入库
export function delMlStockin(id) {
    return request({
        url: '/exe/mlStockin/' + id,
        method: 'delete'
    })
}

// 入库
export function productStockin(id)  {
    return request({
        url: '/exe/mlStockin/productStockin/'+ id,
        method: 'put'
    })
}



// 订单号
export function getNextBillno(billCode) {
    return request({
        url: '/tool/billManager/' + billCode,
        method: 'get'
    })
}

export function updateBillSeq(billCode) {
    return request({
        url: '/tool/billManager/' + billCode,
        method: 'put'
    })
}

