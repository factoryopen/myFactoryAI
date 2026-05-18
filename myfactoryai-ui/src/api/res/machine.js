import request from '@/utils/request'

// 查询机台管理列表
export function listMachine(query) {
    return request({
        url: '/res/machine/list',
        method: 'get',
        params: query
    })
}

// 查询机台管理详细
export function getMachine(id) {
    return request({
        url: '/res/machine/' + id,
        method: 'get'
    })
}

// 新增机台管理
export function addMachine(data) {
    return request({
        url: '/res/machine',
        method: 'post',
        data: data
    })
}

// 修改机台管理
export function updateMachine(data) {
    return request({
        url: '/res/machine',
        method: 'put',
        data: data
    })
}

// 删除机台管理
export function delMachine(id) {
    return request({
        url: '/res/machine/' + id,
        method: 'delete'
    })
}



