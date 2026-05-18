import request from '@/utils/request'

// 查询机型管理列表
export function listMachineType(query) {
    return request({
        url: '/res/machineType/list',
        method: 'get',
        params: query
    })
}

// 查询机型管理详细
export function getMachineType(id) {
    return request({
        url: '/res/machineType/' + id,
        method: 'get'
    })
}

// 新增机型管理
export function addMachineType(data) {
    return request({
        url: '/res/machineType',
        method: 'post',
        data: data
    })
}

// 修改机型管理
export function updateMachineType(data) {
    return request({
        url: '/res/machineType',
        method: 'put',
        data: data
    })
}

// 删除机型管理
export function delMachineType(id) {
    return request({
        url: '/res/machineType/' + id,
        method: 'delete'
    })
}



