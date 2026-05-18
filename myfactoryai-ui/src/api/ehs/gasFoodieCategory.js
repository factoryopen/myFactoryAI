import request from '@/utils/request'

// 查询气耗设备分类列表
export function listGasFoodieCategory(query) {
    return request({
        url: '/ehs/gasFoodieCategory/list',
        method: 'get',
        params: query
    })
}

// 查询气耗设备分类详细
export function getGasFoodieCategory(id) {
    return request({
        url: '/ehs/gasFoodieCategory/' + id,
        method: 'get'
    })
}

// 新增气耗设备分类
export function addGasFoodieCategory(data) {
    return request({
        url: '/ehs/gasFoodieCategory',
        method: 'post',
        data: data
    })
}

// 修改气耗设备分类
export function updateGasFoodieCategory(data) {
    return request({
        url: '/ehs/gasFoodieCategory',
        method: 'put',
        data: data
    })
}

// 删除气耗设备分类
export function delGasFoodieCategory(id) {
    return request({
        url: '/ehs/gasFoodieCategory/' + id,
        method: 'delete'
    })
}



