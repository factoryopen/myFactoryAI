import request from '@/utils/request'

// 查询客户项目预配列表
export function listProject(query) {
    return request({
        url: '/ord/project/list',
        method: 'get',
        params: query
    })
}

// 查询客户项目预配详细
export function getProject(id) {
    return request({
        url: '/ord/project/' + id,
        method: 'get'
    })
}

// 新增客户项目预配
export function addProject(data) {
    return request({
        url: '/ord/project',
        method: 'post',
        data: data
    })
}

// 修改客户项目预配
export function updateProject(data) {
    return request({
        url: '/ord/project',
        method: 'put',
        data: data
    })
}

// 删除客户项目预配
export function delProject(id) {
    return request({
        url: '/ord/project/' + id,
        method: 'delete'
    })
}



