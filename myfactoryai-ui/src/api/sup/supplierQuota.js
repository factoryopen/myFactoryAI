import request from '@/utils/request'

// 查询供应商配额列表
export function listSupplierQuota(query) {
    return request({
        url: '/sup/supplierQuota/list',
        method: 'get',
        params: query
    })
}

// 查询供应商配额详细
export function getSupplierQuota(id) {
    return request({
        url: '/sup/supplierQuota/' + id,
        method: 'get'
    })
}

// 新增供应商配额
export function addSupplierQuota(data) {
    return request({
        url: '/sup/supplierQuota',
        method: 'post',
        data: data
    })
}

// 修改供应商配额
export function updateSupplierQuota(data) {
    return request({
        url: '/sup/supplierQuota',
        method: 'put',
        data: data
    })
}

// 删除供应商配额
export function delSupplierQuota(id) {
    return request({
        url: '/sup/supplierQuota/' + id,
        method: 'delete'
    })
}



