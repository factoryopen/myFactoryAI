import request from '@/utils/request'

// 查询MRP物料需求列表
export function listMrpMr(query) {
    return request({
        url: '/pln/mrpMr/list',
        method: 'get',
        params: query
    })
}

// 查询MRP物料需求详细
export function getMrpMr(id) {
    return request({
        url: '/pln/mrpMr/' + id,
        method: 'get'
    })
}

// 新增MRP物料需求
export function addMrpMr(data) {
    return request({
        url: '/pln/mrpMr',
        method: 'post',
        data: data
    })
}

// 修改MRP物料需求
export function updateMrpMr(data) {
    return request({
        url: '/pln/mrpMr',
        method: 'put',
        data: data
    })
}

// 删除MRP物料需求
export function delMrpMr(id) {
    return request({
        url: '/pln/mrpMr/' + id,
        method: 'delete'
    })
}


// 转需求
export function toMp(id)  {
    return request({
        url: '/pln/mrpMr/toMp/'+ id,
        method: 'put'
    })
}

