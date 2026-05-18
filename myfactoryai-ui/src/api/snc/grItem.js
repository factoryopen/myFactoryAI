import request from '@/utils/request'

// 查询收货单明细列表
export function listGrItem(query) {
    return request({
        url: '/snc/grItem/list',
        method: 'get',
        params: query
    })
}

// 查询收货单明细详细
export function getGrItem(id) {
    return request({
        url: '/snc/grItem/' + id,
        method: 'get'
    })
}

// 新增收货单明细
export function addGrItem(data) {
    return request({
        url: '/snc/grItem',
        method: 'post',
        data: data
    })
}

// 修改收货单明细
export function updateGrItem(data) {
    return request({
        url: '/snc/grItem',
        method: 'put',
        data: data
    })
}

// 删除收货单明细
export function delGrItem(id) {
    return request({
        url: '/snc/grItem/' + id,
        method: 'delete'
    })
}



