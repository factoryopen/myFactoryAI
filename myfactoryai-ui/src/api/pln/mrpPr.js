import request from '@/utils/request'

// 查询物料需求列表
export function listMrpPr(query) {
    return request({
        url: '/pln/mrpPr/list',
        method: 'get',
        params: query
    })
}

// 查询物料需求详细
export function getMrpPr(id) {
    return request({
        url: '/pln/mrpPr/' + id,
        method: 'get'
    })
}

// 新增物料需求
export function addMrpPr(data) {
    return request({
        url: '/pln/mrpPr',
        method: 'post',
        data: data
    })
}

// 修改物料需求
export function updateMrpPr(data) {
    return request({
        url: '/pln/mrpPr',
        method: 'put',
        data: data
    })
}

// 删除物料需求
export function delMrpPr(id) {
    return request({
        url: '/pln/mrpPr/' + id,
        method: 'delete'
    })
}

// 请购
export function requestPurchase(id)  {
    return request({
        url: '/pln/mrpPr/requestPurchase/'+ id,
        method: 'put'
    })
}


