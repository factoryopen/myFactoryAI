import request from '@/utils/request'

// 查询客诉登记列表
export function listComplain(query) {
    return request({
        url: '/ord/complain/list',
        method: 'get',
        params: query
    })
}

// 查询客诉登记详细
export function getComplain(id) {
    return request({
        url: '/ord/complain/' + id,
        method: 'get'
    })
}

// 新增客诉登记
export function addComplain(data) {
    return request({
        url: '/ord/complain',
        method: 'post',
        data: data
    })
}

// 修改客诉登记
export function updateComplain(data) {
    return request({
        url: '/ord/complain',
        method: 'put',
        data: data
    })
}

// 删除客诉登记
export function delComplain(id) {
    return request({
        url: '/ord/complain/' + id,
        method: 'delete'
    })
}


// 发布
export function enableOrdComplain(id)  {
    return request({
        url: '/ord/complain/enableOrdComplain/'+ id,
        method: 'put'
    })
}
// 请检
export function requestInspect(data)  {
    return request({
        url: '/ord/complain/requestInspect',
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

