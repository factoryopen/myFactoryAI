import request from '@/utils/request'

// 查询工单工序图列表
export function listWoRoutingdrawing(query) {
    return request({
        url: '/pln/woRoutingdrawing/list',
        method: 'get',
        params: query
    })
}

// 查询工单工序图详细
export function getWoRoutingdrawing(id) {
    return request({
        url: '/pln/woRoutingdrawing/' + id,
        method: 'get'
    })
}

// 新增工单工序图
export function addWoRoutingdrawing(data) {
    return request({
        url: '/pln/woRoutingdrawing',
        method: 'post',
        data: data
    })
}

// 修改工单工序图
export function updateWoRoutingdrawing(data) {
    return request({
        url: '/pln/woRoutingdrawing',
        method: 'put',
        data: data
    })
}

// 删除工单工序图
export function delWoRoutingdrawing(id) {
    return request({
        url: '/pln/woRoutingdrawing/' + id,
        method: 'delete'
    })
}



