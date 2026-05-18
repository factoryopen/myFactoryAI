import request from '@/utils/request'

// 查询退货项跟踪列表
export function listPoItemReturn(query) {
    return request({
        url: '/sup/poItemReturn/list',
        method: 'get',
        params: query
    })
}

// 查询退货项跟踪详细
export function getPoItemReturn(id) {
    return request({
        url: '/sup/poItemReturn/' + id,
        method: 'get'
    })
}

// 新增退货项跟踪
export function addPoItemReturn(data) {
    return request({
        url: '/sup/poItemReturn',
        method: 'post',
        data: data
    })
}

// 修改退货项跟踪
export function updatePoItemReturn(data) {
    return request({
        url: '/sup/poItemReturn',
        method: 'put',
        data: data
    })
}

// 删除退货项跟踪
export function delPoItemReturn(id) {
    return request({
        url: '/sup/poItemReturn/' + id,
        method: 'delete'
    })
}



