import request from '@/utils/request'

// 查询批次工序图列表
export function listMlRoutingdrawing(query) {
    return request({
        url: '/pln/mlRoutingdrawing/list',
        method: 'get',
        params: query
    })
}

// 查询批次工序图详细
export function getMlRoutingdrawing(id) {
    return request({
        url: '/pln/mlRoutingdrawing/' + id,
        method: 'get'
    })
}

// 新增批次工序图
export function addMlRoutingdrawing(data) {
    return request({
        url: '/pln/mlRoutingdrawing',
        method: 'post',
        data: data
    })
}

// 修改批次工序图
export function updateMlRoutingdrawing(data) {
    return request({
        url: '/pln/mlRoutingdrawing',
        method: 'put',
        data: data
    })
}

// 删除批次工序图
export function delMlRoutingdrawing(id) {
    return request({
        url: '/pln/mlRoutingdrawing/' + id,
        method: 'delete'
    })
}



