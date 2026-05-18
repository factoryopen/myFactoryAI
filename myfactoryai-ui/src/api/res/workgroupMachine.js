import request from '@/utils/request'

// 查询班组工序列表
export function listWorkgroupMachine(query) {
    return request({
        url: '/res/workgroupMachine/list',
        method: 'get',
        params: query
    })
}

// 查询班组工序详细
export function getWorkgroupMachine(id) {
    return request({
        url: '/res/workgroupMachine/' + id,
        method: 'get'
    })
}

// 新增班组工序
export function addWorkgroupMachine(data) {
    return request({
        url: '/res/workgroupMachine',
        method: 'post',
        data: data
    })
}

// 修改班组工序
export function updateWorkgroupMachine(data) {
    return request({
        url: '/res/workgroupMachine',
        method: 'put',
        data: data
    })
}

// 删除班组工序
export function delWorkgroupMachine(id) {
    return request({
        url: '/res/workgroupMachine/' + id,
        method: 'delete'
    })
}



