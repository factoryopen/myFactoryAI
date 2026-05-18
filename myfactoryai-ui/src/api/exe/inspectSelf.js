import request from '@/utils/request'

// 查询自检异常登记列表
export function listInspectSelf(query) {
    return request({
        url: '/exe/inspectSelf/list',
        method: 'get',
        params: query
    })
}

// 查询自检异常登记列表
export function listInspectSelfByOperator(query) {
  return request({
    url: '/exe/inspectSelf/listByOperator',
    method: 'get',
    params: query
  })
}

// 查询自检异常登记详细
export function getInspectSelf(id) {
    return request({
        url: '/exe/inspectSelf/' + id,
        method: 'get'
    })
}

// 新增自检异常登记
export function addInspectSelf(data) {
    return request({
        url: '/exe/inspectSelf',
        method: 'post',
        data: data
    })
}

// 修改自检异常登记
export function updateInspectSelf(data) {
    return request({
        url: '/exe/inspectSelf',
        method: 'put',
        data: data
    })
}

// 删除自检异常登记
export function delInspectSelf(id) {
    return request({
        url: '/exe/inspectSelf/' + id,
        method: 'delete'
    })
}

// 请判
export function requestDeal(data)  {
    return request({
        url: '/exe/inspectSelf/requestDeal',
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

