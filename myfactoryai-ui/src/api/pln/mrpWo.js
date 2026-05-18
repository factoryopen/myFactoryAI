import request from '@/utils/request'

// 查询MRP工单项列表
export function listMrpWo(query) {
    return request({
        url: '/pln/mrpWo/list',
        method: 'get',
        params: query
    })
}

// 查询MRP工单项详细
export function getMrpWo(id) {
    return request({
        url: '/pln/mrpWo/' + id,
        method: 'get'
    })
}

// 新增MRP工单项
export function addMrpWo(data) {
    return request({
        url: '/pln/mrpWo',
        method: 'post',
        data: data
    })
}

// 修改MRP工单项
export function updateMrpWo(data) {
    return request({
        url: '/pln/mrpWo',
        method: 'put',
        data: data
    })
}

// 删除MRP工单项
export function delMrpWo(id) {
    return request({
        url: '/pln/mrpWo/' + id,
        method: 'delete'
    })
}


// 转工单
export function toWo(id)  {
    return request({
        url: '/pln/mrpWo/toWo/'+ id,
        method: 'put'
    })
}

