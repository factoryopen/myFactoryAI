import request from '@/utils/request'

// 查询外协厂商管理列表
export function listSupplier(query) {
    return request({
        url: '/del/supplier/list',
        method: 'get',
        params: query
    })
}

// 查询外协厂商管理详细
export function getSupplier(id) {
    return request({
        url: '/del/supplier/' + id,
        method: 'get'
    })
}

// 新增外协厂商管理
export function addSupplier(data) {
    return request({
        url: '/del/supplier',
        method: 'post',
        data: data
    })
}

// 修改外协厂商管理
export function updateSupplier(data) {
    return request({
        url: '/del/supplier',
        method: 'put',
        data: data
    })
}

// 删除外协厂商管理
export function delSupplier(id) {
    return request({
        url: '/del/supplier/' + id,
        method: 'delete'
    })
}



