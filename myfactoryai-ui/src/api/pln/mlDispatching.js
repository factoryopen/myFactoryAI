import request from '@/utils/request'

// 查询上线派工列表
export function listMlDispatching(query) {
    return request({
        url: '/pln/mlDispatching/list',
        method: 'get',
        params: query
    })
}

// 查询上线派工详细
export function getMlDispatching(id) {
    return request({
        url: '/pln/mlDispatching/' + id,
        method: 'get'
    })
}

// 新增上线派工
export function addMlDispatching(data) {
    return request({
        url: '/pln/mlDispatching',
        method: 'post',
        data: data
    })
}

// 修改上线派工
export function updateMlDispatching(data) {
    return request({
        url: '/pln/mlDispatching',
        method: 'put',
        data: data
    })
}

// 删除上线派工
export function delMlDispatching(id) {
    return request({
        url: '/pln/mlDispatching/' + id,
        method: 'delete'
    })
}

// 批派
export function dispatchMultipleMl(ids, data)  {
    return request({
        url: '/pln/mlDispatching/dispatchMultipleMl/'+ ids,
        method: 'put',
        data: data
    })
}
// 单派
export function dispatchSingleMl(data)  {
    return request({
        url: '/pln/mlDispatching/dispatchSingleMl',
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

