import request from '@/utils/request'

// 查询电耗设备分类列表
export function listPowerFoodieCategory(query) {
    return request({
        url: '/ehs/powerFoodieCategory/list',
        method: 'get',
        params: query
    })
}

// 查询电耗设备分类详细
export function getPowerFoodieCategory(id) {
    return request({
        url: '/ehs/powerFoodieCategory/' + id,
        method: 'get'
    })
}

// 新增电耗设备分类
export function addPowerFoodieCategory(data) {
    return request({
        url: '/ehs/powerFoodieCategory',
        method: 'post',
        data: data
    })
}

// 修改电耗设备分类
export function updatePowerFoodieCategory(data) {
    return request({
        url: '/ehs/powerFoodieCategory',
        method: 'put',
        data: data
    })
}

// 删除电耗设备分类
export function delPowerFoodieCategory(id) {
    return request({
        url: '/ehs/powerFoodieCategory/' + id,
        method: 'delete'
    })
}



