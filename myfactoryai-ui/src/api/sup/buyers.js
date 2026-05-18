import request from '@/utils/request'

// 查询采购员配置列表
export function listBuyers(query) {
    return request({
        url: '/sup/buyers/list',
        method: 'get',
        params: query
    })
}

// 查询采购员配置详细
export function getBuyers(id) {
    return request({
        url: '/sup/buyers/' + id,
        method: 'get'
    })
}

// 新增采购员配置
export function addBuyers(data) {
    return request({
        url: '/sup/buyers',
        method: 'post',
        data: data
    })
}

// 修改采购员配置
export function updateBuyers(data) {
    return request({
        url: '/sup/buyers',
        method: 'put',
        data: data
    })
}

// 删除采购员配置
export function delBuyers(id) {
    return request({
        url: '/sup/buyers/' + id,
        method: 'delete'
    })
}



