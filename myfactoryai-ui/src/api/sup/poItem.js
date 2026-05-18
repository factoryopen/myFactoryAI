import request from '@/utils/request'

// 查询采购单明细列表
export function listPoItem(query) {
    return request({
        url: '/sup/poItem/list',
        method: 'get',
        params: query
    })
}

// 查询采购单明细详细
export function getPoItem(id) {
    return request({
        url: '/sup/poItem/' + id,
        method: 'get'
    })
}

// 新增采购单明细
export function addPoItem(data) {
    return request({
        url: '/sup/poItem',
        method: 'post',
        data: data
    })
}

// 修改采购单明细
export function updatePoItem(data) {
    return request({
        url: '/sup/poItem',
        method: 'put',
        data: data
    })
}

// 删除采购单明细
export function delPoItem(id) {
    return request({
        url: '/sup/poItem/' + id,
        method: 'delete'
    })
}



