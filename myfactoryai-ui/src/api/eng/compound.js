import request from '@/utils/request'

// 查询材质数据列表
export function listCompound(query) {
    return request({
        url: '/eng/compound/list',
        method: 'get',
        params: query
    })
}

// 查询材质数据详细
export function getCompound(id) {
    return request({
        url: '/eng/compound/' + id,
        method: 'get'
    })
}

// 新增材质数据
export function addCompound(data) {
    return request({
        url: '/eng/compound',
        method: 'post',
        data: data
    })
}

// 修改材质数据
export function updateCompound(data) {
    return request({
        url: '/eng/compound',
        method: 'put',
        data: data
    })
}

// 删除材质数据
export function delCompound(id) {
    return request({
        url: '/eng/compound/' + id,
        method: 'delete'
    })
}



