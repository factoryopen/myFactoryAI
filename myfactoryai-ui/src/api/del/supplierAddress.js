import request from '@/utils/request'

// 查询供应商地址列表
export function listSupplierAddress(query) {
    return request({
        url: '/del/supplierAddress/list',
        method: 'get',
        params: query
    })
}

// 查询供应商地址详细
export function getSupplierAddress(id) {
    return request({
        url: '/del/supplierAddress/' + id,
        method: 'get'
    })
}

// 新增供应商地址
export function addSupplierAddress(data) {
    return request({
        url: '/del/supplierAddress',
        method: 'post',
        data: data
    })
}

// 修改供应商地址
export function updateSupplierAddress(data) {
    return request({
        url: '/del/supplierAddress',
        method: 'put',
        data: data
    })
}

// 删除供应商地址
export function delSupplierAddress(id) {
    return request({
        url: '/del/supplierAddress/' + id,
        method: 'delete'
    })
}



