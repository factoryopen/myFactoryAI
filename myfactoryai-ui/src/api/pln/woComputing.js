import request from '@/utils/request'

// 查询计划分解列表
export function listWoComputing(query) {
    return request({
        url: '/pln/woComputing/list',
        method: 'get',
        params: query
    })
}

// 查询计划分解详细
export function getWoComputing(id) {
    return request({
        url: '/pln/woComputing/' + id,
        method: 'get'
    })
}

// 新增计划分解
export function addWoComputing(data) {
    return request({
        url: '/pln/woComputing',
        method: 'post',
        data: data
    })
}

// 修改计划分解
export function updateWoComputing(data) {
    return request({
        url: '/pln/woComputing',
        method: 'put',
        data: data
    })
}

// 删除计划分解
export function delWoComputing(id) {
    return request({
        url: '/pln/woComputing/' + id,
        method: 'delete'
    })
}

// 分解
export function splitMps(id)  {
    return request({
        url: '/pln/woComputing/splitMps/'+ id,
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

