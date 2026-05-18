import request from '@/utils/request'

// 查询线索拜访列表
export function listLeadsVisiting(query) {
    return request({
        url: '/cha/leadsVisiting/list',
        method: 'get',
        params: query
    })
}

// 查询线索拜访详细
export function getLeadsVisiting(id) {
    return request({
        url: '/cha/leadsVisiting/' + id,
        method: 'get'
    })
}

// 新增线索拜访
export function addLeadsVisiting(data) {
    return request({
        url: '/cha/leadsVisiting',
        method: 'post',
        data: data
    })
}

// 修改线索拜访
export function updateLeadsVisiting(data) {
    return request({
        url: '/cha/leadsVisiting',
        method: 'put',
        data: data
    })
}

// 删除线索拜访
export function delLeadsVisiting(id) {
    return request({
        url: '/cha/leadsVisiting/' + id,
        method: 'delete'
    })
}



