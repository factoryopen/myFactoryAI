import request from '@/utils/request'

// 查询班组工序列表
export function listWorkgroupTool(query) {
    return request({
        url: '/res/workgroupTool/list',
        method: 'get',
        params: query
    })
}

// 查询班组工序详细
export function getWorkgroupTool(id) {
    return request({
        url: '/res/workgroupTool/' + id,
        method: 'get'
    })
}

// 新增班组工序
export function addWorkgroupTool(data) {
    return request({
        url: '/res/workgroupTool',
        method: 'post',
        data: data
    })
}

// 修改班组工序
export function updateWorkgroupTool(data) {
    return request({
        url: '/res/workgroupTool',
        method: 'put',
        data: data
    })
}

// 删除班组工序
export function delWorkgroupTool(id) {
    return request({
        url: '/res/workgroupTool/' + id,
        method: 'delete'
    })
}



