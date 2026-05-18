import request from '@/utils/request'

// 查询订单客诉登记列表
export function listSoComplain(query) {
    return request({
        url: '/ord/soComplain/list',
        method: 'get',
        params: query
    })
}

// 查询订单客诉登记详细
export function getSoComplain(id) {
    return request({
        url: '/ord/soComplain/' + id,
        method: 'get'
    })
}

// 新增订单客诉登记
export function addSoComplain(data) {
    return request({
        url: '/ord/soComplain',
        method: 'post',
        data: data
    })
}

// 修改订单客诉登记
export function updateSoComplain(data) {
    return request({
        url: '/ord/soComplain',
        method: 'put',
        data: data
    })
}

// 删除订单客诉登记
export function delSoComplain(id) {
    return request({
        url: '/ord/soComplain/' + id,
        method: 'delete'
    })
}

// 客诉
export function complainReg(data)  {
    return request({
        url: '/ord/soComplain/complainReg',
        method: 'put',
        data: data
    })
}


