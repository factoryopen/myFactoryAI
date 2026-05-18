import request from '@/utils/request'

// 查询免检物料列表
export function listFreeinspectMaterial(query) {
    return request({
        url: '/qua/freeinspectMaterial/list',
        method: 'get',
        params: query
    })
}

// 查询免检物料详细
export function getFreeinspectMaterial(id) {
    return request({
        url: '/qua/freeinspectMaterial/' + id,
        method: 'get'
    })
}

// 新增免检物料
export function addFreeinspectMaterial(data) {
    return request({
        url: '/qua/freeinspectMaterial',
        method: 'post',
        data: data
    })
}

// 修改免检物料
export function updateFreeinspectMaterial(data) {
    return request({
        url: '/qua/freeinspectMaterial',
        method: 'put',
        data: data
    })
}

// 删除免检物料
export function delFreeinspectMaterial(id) {
    return request({
        url: '/qua/freeinspectMaterial/' + id,
        method: 'delete'
    })
}



