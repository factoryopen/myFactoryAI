import request from '@/utils/request'

// 查询线索备案列表
export function listLeads(query) {
    return request({
        url: '/cha/leads/list',
        method: 'get',
        params: query
    })
}

// 查询线索备案详细
export function getLeads(id) {
    return request({
        url: '/cha/leads/' + id,
        method: 'get'
    })
}

// 新增线索备案
export function addLeads(data) {
    return request({
        url: '/cha/leads',
        method: 'post',
        data: data
    })
}

// 修改线索备案
export function updateLeads(data) {
    return request({
        url: '/cha/leads',
        method: 'put',
        data: data
    })
}

// 删除线索备案
export function delLeads(id) {
    return request({
        url: '/cha/leads/' + id,
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

