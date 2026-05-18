import request from '@/utils/request'

// 查询工人管理列表
export function listLabor(query) {
    return request({
        url: '/res/labor/list',
        method: 'get',
        params: query
    })
}

// 查询工人管理详细
export function getLabor(id) {
    return request({
        url: '/res/labor/' + id,
        method: 'get'
    })
}

// 新增工人管理
export function addLabor(data) {
    return request({
        url: '/res/labor',
        method: 'post',
        data: data
    })
}

// 修改工人管理
export function updateLabor(data) {
    return request({
        url: '/res/labor',
        method: 'put',
        data: data
    })
}

// 删除工人管理
export function delLabor(id) {
    return request({
        url: '/res/labor/' + id,
        method: 'delete'
    })
}



