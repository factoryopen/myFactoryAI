import request from '@/utils/request'

// 查询订单对账服务列表
export function listCheckbusi(query) {
    return request({
        url: '/ord/checkbusi/list',
        method: 'get',
        params: query
    })
}

// 查询订单对账服务详细
export function getCheckbusi(id) {
    return request({
        url: '/ord/checkbusi/' + id,
        method: 'get'
    })
}

// 新增订单对账服务
export function addCheckbusi(data) {
    return request({
        url: '/ord/checkbusi',
        method: 'post',
        data: data
    })
}

// 修改订单对账服务
export function updateCheckbusi(data) {
    return request({
        url: '/ord/checkbusi',
        method: 'put',
        data: data
    })
}

// 删除订单对账服务
export function delCheckbusi(id) {
    return request({
        url: '/ord/checkbusi/' + id,
        method: 'delete'
    })
}

// 对账
export function checkOrderBusi(id)  {
    return request({
        url: '/ord/checkbusi/checkOrderBusi/'+ id,
        method: 'put'
    })
}


