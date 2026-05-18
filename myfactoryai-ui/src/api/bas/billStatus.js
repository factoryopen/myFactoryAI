import request from '@/utils/request'

// 查询单据状态列表
export function listBillStatus(query) {
    return request({
        url: '/bas/billStatus/list',
        method: 'get',
        params: query
    })
}

// 查询单据状态详细
export function getBillStatus(id) {
    return request({
        url: '/bas/billStatus/' + id,
        method: 'get'
    })
}

// 新增单据状态
export function addBillStatus(data) {
    return request({
        url: '/bas/billStatus',
        method: 'post',
        data: data
    })
}

// 修改单据状态
export function updateBillStatus(data) {
    return request({
        url: '/bas/billStatus',
        method: 'put',
        data: data
    })
}

// 删除单据状态
export function delBillStatus(id) {
    return request({
        url: '/bas/billStatus/' + id,
        method: 'delete'
    })
}



