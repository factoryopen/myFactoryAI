import request from '@/utils/request'

// 查询历史批次查询列表
export function listMlHistory(query) {
    return request({
        url: '/exe/mlHistory/list',
        method: 'get',
        params: query
    })
}

// 查询历史批次查询详细
export function getMlHistory(id) {
    return request({
        url: '/exe/mlHistory/' + id,
        method: 'get'
    })
}

// 新增历史批次查询
export function addMlHistory(data) {
    return request({
        url: '/exe/mlHistory',
        method: 'post',
        data: data
    })
}

// 修改历史批次查询
export function updateMlHistory(data) {
    return request({
        url: '/exe/mlHistory',
        method: 'put',
        data: data
    })
}

// 删除历史批次查询
export function delMlHistory(id) {
    return request({
        url: '/exe/mlHistory/' + id,
        method: 'delete'
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

