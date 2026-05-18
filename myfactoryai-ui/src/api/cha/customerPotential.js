import request from '@/utils/request'

// 查询潜客备案列表
export function listCustomerPotential(query) {
    return request({
        url: '/cha/customerPotential/list',
        method: 'get',
        params: query
    })
}

// 查询潜客备案详细
export function getCustomerPotential(id) {
    return request({
        url: '/cha/customerPotential/' + id,
        method: 'get'
    })
}

// 新增潜客备案
export function addCustomerPotential(data) {
    return request({
        url: '/cha/customerPotential',
        method: 'post',
        data: data
    })
}

// 修改潜客备案
export function updateCustomerPotential(data) {
    return request({
        url: '/cha/customerPotential',
        method: 'put',
        data: data
    })
}

// 删除潜客备案
export function delCustomerPotential(id) {
    return request({
        url: '/cha/customerPotential/' + id,
        method: 'delete'
    })
}



