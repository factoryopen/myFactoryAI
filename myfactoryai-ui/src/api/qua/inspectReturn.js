import request from '@/utils/request'

// 查询退货检异登记列表
export function listInspectReturn(query) {
    return request({
        url: '/qua/inspectReturn/list',
        method: 'get',
        params: query
    })
}

// 查询退货检异登记详细
export function getInspectReturn(id) {
    return request({
        url: '/qua/inspectReturn/' + id,
        method: 'get'
    })
}

// 新增退货检异登记
export function addInspectReturn(data) {
    return request({
        url: '/qua/inspectReturn',
        method: 'post',
        data: data
    })
}

// 修改退货检异登记
export function updateInspectReturn(data) {
    return request({
        url: '/qua/inspectReturn',
        method: 'put',
        data: data
    })
}

// 删除退货检异登记
export function delInspectReturn(id) {
    return request({
        url: '/qua/inspectReturn/' + id,
        method: 'delete'
    })
}

// 请判
export function requestDeal(data)  {
    return request({
        url: '/qua/inspectReturn/requestDeal',
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

