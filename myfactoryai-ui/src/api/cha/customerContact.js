import request from '@/utils/request'

// 查询客户人员列表
export function listCustomerContact(query) {
    return request({
        url: '/cha/customerContact/list',
        method: 'get',
        params: query
    })
}

// 查询客户人员详细
export function getCustomerContact(id) {
    return request({
        url: '/cha/customerContact/' + id,
        method: 'get'
    })
}

// 新增客户人员
export function addCustomerContact(data) {
    return request({
        url: '/cha/customerContact',
        method: 'post',
        data: data
    })
}

// 修改客户人员
export function updateCustomerContact(data) {
    return request({
        url: '/cha/customerContact',
        method: 'put',
        data: data
    })
}

// 删除客户人员
export function delCustomerContact(id) {
    return request({
        url: '/cha/customerContact/' + id,
        method: 'delete'
    })
}



