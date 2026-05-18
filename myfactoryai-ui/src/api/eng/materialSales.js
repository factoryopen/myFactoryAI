import request from '@/utils/request'

// 查询物料销售维列表
export function listMaterialSales(query) {
    return request({
        url: '/eng/materialSales/list',
        method: 'get',
        params: query
    })
}

// 查询物料销售维详细
export function getMaterialSales(id) {
    return request({
        url: '/eng/materialSales/' + id,
        method: 'get'
    })
}

// 新增物料销售维
export function addMaterialSales(data) {
    return request({
        url: '/eng/materialSales',
        method: 'post',
        data: data
    })
}

// 修改物料销售维
export function updateMaterialSales(data) {
    return request({
        url: '/eng/materialSales',
        method: 'put',
        data: data
    })
}

// 删除物料销售维
export function delMaterialSales(id) {
    return request({
        url: '/eng/materialSales/' + id,
        method: 'delete'
    })
}



