import request from '@/utils/request'

// 查询包装方式预配列表
export function listPackagePattern(query) {
    return request({
        url: '/ord/packagePattern/list',
        method: 'get',
        params: query
    })
}

// 查询包装方式预配详细
export function getPackagePattern(id) {
    return request({
        url: '/ord/packagePattern/' + id,
        method: 'get'
    })
}

// 新增包装方式预配
export function addPackagePattern(data) {
    return request({
        url: '/ord/packagePattern',
        method: 'post',
        data: data
    })
}

// 修改包装方式预配
export function updatePackagePattern(data) {
    return request({
        url: '/ord/packagePattern',
        method: 'put',
        data: data
    })
}

// 删除包装方式预配
export function delPackagePattern(id) {
    return request({
        url: '/ord/packagePattern/' + id,
        method: 'delete'
    })
}



