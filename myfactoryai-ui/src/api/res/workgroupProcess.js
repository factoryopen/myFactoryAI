import request from '@/utils/request'

// 查询班组工序列表
export function listWorkgroupProcess(query) {
    return request({
        url: '/res/workgroupProcess/list',
        method: 'get',
        params: query
    })
}

// 查询班组工序详细
export function getWorkgroupProcess(id) {
    return request({
        url: '/res/workgroupProcess/' + id,
        method: 'get'
    })
}

// 新增班组工序
export function addWorkgroupProcess(data) {
    return request({
        url: '/res/workgroupProcess',
        method: 'post',
        data: data
    })
}

// 修改班组工序
export function updateWorkgroupProcess(data) {
    return request({
        url: '/res/workgroupProcess',
        method: 'put',
        data: data
    })
}

// 删除班组工序
export function delWorkgroupProcess(id) {
    return request({
        url: '/res/workgroupProcess/' + id,
        method: 'delete'
    })
}



