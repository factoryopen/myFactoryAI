import request from '@/utils/request'

// 查询新派批次列表
export function listMlCreated(query) {
    return request({
        url: '/pln/mlCreated/list',
        method: 'get',
        params: query
    })
}

// 查询新派批次详细
export function getMlCreated(id) {
    return request({
        url: '/pln/mlCreated/' + id,
        method: 'get'
    })
}

// 新增新派批次
export function addMlCreated(data) {
    return request({
        url: '/pln/mlCreated',
        method: 'post',
        data: data
    })
}

// 修改新派批次
export function updateMlCreated(data) {
    return request({
        url: '/pln/mlCreated',
        method: 'put',
        data: data
    })
}

// 删除新派批次
export function delMlCreated(id) {
    return request({
        url: '/pln/mlCreated/' + id,
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

