import request from '@/utils/request'

// 查询开票方式列表
export function listInvoicePattern(query) {
    return request({
        url: '/bas/invoicePattern/list',
        method: 'get',
        params: query
    })
}

// 查询开票方式详细
export function getInvoicePattern(id) {
    return request({
        url: '/bas/invoicePattern/' + id,
        method: 'get'
    })
}

// 新增开票方式
export function addInvoicePattern(data) {
    return request({
        url: '/bas/invoicePattern',
        method: 'post',
        data: data
    })
}

// 修改开票方式
export function updateInvoicePattern(data) {
    return request({
        url: '/bas/invoicePattern',
        method: 'put',
        data: data
    })
}

// 删除开票方式
export function delInvoicePattern(id) {
    return request({
        url: '/bas/invoicePattern/' + id,
        method: 'delete'
    })
}



