import request from '@/utils/request'

// 查询供应商账号列表
export function listSupplierBank(query) {
    return request({
        url: '/del/supplierBank/list',
        method: 'get',
        params: query
    })
}

// 查询供应商账号详细
export function getSupplierBank(id) {
    return request({
        url: '/del/supplierBank/' + id,
        method: 'get'
    })
}

// 新增供应商账号
export function addSupplierBank(data) {
    return request({
        url: '/del/supplierBank',
        method: 'post',
        data: data
    })
}

// 修改供应商账号
export function updateSupplierBank(data) {
    return request({
        url: '/del/supplierBank',
        method: 'put',
        data: data
    })
}

// 删除供应商账号
export function delSupplierBank(id) {
    return request({
        url: '/del/supplierBank/' + id,
        method: 'delete'
    })
}



