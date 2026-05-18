import request from '@/utils/request'

// 查询物料需求列表
export function listMaterialRequirements(query) {
    return request({
        url: '/pln/materialRequirements/list',
        method: 'get',
        params: query
    })
}

// 查询物料需求详细
export function getMaterialRequirements(id) {
    return request({
        url: '/pln/materialRequirements/' + id,
        method: 'get'
    })
}

// 新增物料需求
export function addMaterialRequirements(data) {
    return request({
        url: '/pln/materialRequirements',
        method: 'post',
        data: data
    })
}

// 修改物料需求
export function updateMaterialRequirements(data) {
    return request({
        url: '/pln/materialRequirements',
        method: 'put',
        data: data
    })
}

// 删除物料需求
export function delMaterialRequirements(id) {
    return request({
        url: '/pln/materialRequirements/' + id,
        method: 'delete'
    })
}

// 请购
export function requestPurchase(id)  {
    return request({
        url: '/pln/materialRequirements/requestPurchase/'+ id,
        method: 'put'
    })
}


