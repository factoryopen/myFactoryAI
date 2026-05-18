import request from '@/utils/request'

// 查询物料需求列表
export function listMrpMp(query) {
    return request({
        url: '/pln/mrpMp/list',
        method: 'get',
        params: query
    })
}

// 查询物料需求详细
export function getMrpMp(id) {
    return request({
        url: '/pln/mrpMp/' + id,
        method: 'get'
    })
}

// 新增物料需求
export function addMrpMp(data) {
    return request({
        url: '/pln/mrpMp',
        method: 'post',
        data: data
    })
}

// 修改物料需求
export function updateMrpMp(data) {
    return request({
        url: '/pln/mrpMp',
        method: 'put',
        data: data
    })
}

// 删除物料需求
export function delMrpMp(id) {
    return request({
        url: '/pln/mrpMp/' + id,
        method: 'delete'
    })
}

// 启用
export function enable(id)  {
    return request({
        url: '/pln/mrpMp/enable/'+ id,
        method: 'put'
    })
}
// 请购
export function requestPurchase(ids)  {
    return request({
        url: '/pln/mrpMp/requestPurchase/'+ ids,
        method: 'put'
    })
}


