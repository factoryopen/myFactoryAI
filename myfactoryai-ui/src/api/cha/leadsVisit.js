import request from '@/utils/request'

// 查询客访登记列表
export function listLeadsVisit(query) {
    return request({
        url: '/cha/leadsVisit/list',
        method: 'get',
        params: query
    })
}

// 查询客访登记详细
export function getLeadsVisit(id) {
    return request({
        url: '/cha/leadsVisit/' + id,
        method: 'get'
    })
}

// 新增客访登记
export function addLeadsVisit(data) {
    return request({
        url: '/cha/leadsVisit',
        method: 'post',
        data: data
    })
}

// 修改客访登记
export function updateLeadsVisit(data) {
    return request({
        url: '/cha/leadsVisit',
        method: 'put',
        data: data
    })
}

// 删除客访登记
export function delLeadsVisit(id) {
    return request({
        url: '/cha/leadsVisit/' + id,
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

