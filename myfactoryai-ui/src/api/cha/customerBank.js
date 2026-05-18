import request from '@/utils/request'

// 查询客户账号列表
export function listCustomerBank(query) {
    return request({
        url: '/cha/customerBank/list',
        method: 'get',
        params: query
    })
}

// 查询客户账号详细
export function getCustomerBank(id) {
    return request({
        url: '/cha/customerBank/' + id,
        method: 'get'
    })
}

// 新增客户账号
export function addCustomerBank(data) {
    return request({
        url: '/cha/customerBank',
        method: 'post',
        data: data
    })
}

// 修改客户账号
export function updateCustomerBank(data) {
    return request({
        url: '/cha/customerBank',
        method: 'put',
        data: data
    })
}

// 删除客户账号
export function delCustomerBank(id) {
    return request({
        url: '/cha/customerBank/' + id,
        method: 'delete'
    })
}



