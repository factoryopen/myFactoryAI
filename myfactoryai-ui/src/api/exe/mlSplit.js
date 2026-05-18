import request from '@/utils/request'

// 查询制造批次分拆列表
export function listMlSplit(query) {
    return request({
        url: '/exe/mlSplit/list',
        method: 'get',
        params: query
    })
}

// 查询制造批次分拆详细
export function getMlSplit(id) {
    return request({
        url: '/exe/mlSplit/' + id,
        method: 'get'
    })
}

// 新增制造批次分拆
export function addMlSplit(data) {
    return request({
        url: '/exe/mlSplit',
        method: 'post',
        data: data
    })
}

// 修改制造批次分拆
export function updateMlSplit(data) {
    return request({
        url: '/exe/mlSplit',
        method: 'put',
        data: data
    })
}

// 删除制造批次分拆
export function delMlSplit(id) {
    return request({
        url: '/exe/mlSplit/' + id,
        method: 'delete'
    })
}

// 分批
export function splitMl(data)  {
    return request({
        url: '/exe/mlSplit/splitMl',
        method: 'put',
        data: data
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

