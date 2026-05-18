import request from '@/utils/request'

// 查询客户数据管理列表
export function listCustomer(query) {
    return request({
        url: '/cha/customer/list',
        method: 'get',
        params: query
    })
}

// 查询客户数据管理详细
export function getCustomer(id) {
    return request({
        url: '/cha/customer/' + id,
        method: 'get'
    })
}

// 新增客户数据管理
export function addCustomer(data) {
    return request({
        url: '/cha/customer',
        method: 'post',
        data: data
    })
}

// 修改客户数据管理
export function updateCustomer(data) {
    return request({
        url: '/cha/customer',
        method: 'put',
        data: data
    })
}

// 删除客户数据管理
export function delCustomer(id) {
    return request({
        url: '/cha/customer/' + id,
        method: 'delete'
    })
}



