import request from '@/utils/request'

// 查询供应商人员列表
export function listSupplierContact(query) {
    return request({
        url: '/del/supplierContact/list',
        method: 'get',
        params: query
    })
}

// 查询供应商人员详细
export function getSupplierContact(id) {
    return request({
        url: '/del/supplierContact/' + id,
        method: 'get'
    })
}

// 新增供应商人员
export function addSupplierContact(data) {
    return request({
        url: '/del/supplierContact',
        method: 'post',
        data: data
    })
}

// 修改供应商人员
export function updateSupplierContact(data) {
    return request({
        url: '/del/supplierContact',
        method: 'put',
        data: data
    })
}

// 删除供应商人员
export function delSupplierContact(id) {
    return request({
        url: '/del/supplierContact/' + id,
        method: 'delete'
    })
}



