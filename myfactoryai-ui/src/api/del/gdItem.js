import request from '@/utils/request'

// 查询发货单明细列表
export function listGdItem(query) {
    return request({
        url: '/del/gdItem/list',
        method: 'get',
        params: query
    })
}

// 查询发货单明细详细
export function getGdItem(id) {
    return request({
        url: '/del/gdItem/' + id,
        method: 'get'
    })
}

// 新增发货单明细
export function addGdItem(data) {
    return request({
        url: '/del/gdItem',
        method: 'post',
        data: data
    })
}

// 修改发货单明细
export function updateGdItem(data) {
    return request({
        url: '/del/gdItem',
        method: 'put',
        data: data
    })
}

// 删除发货单明细
export function delGdItem(id) {
    return request({
        url: '/del/gdItem/' + id,
        method: 'delete'
    })
}



