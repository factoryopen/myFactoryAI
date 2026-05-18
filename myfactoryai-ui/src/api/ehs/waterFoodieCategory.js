import request from '@/utils/request'

// 查询水耗设备分类列表
export function listWaterFoodieCategory(query) {
    return request({
        url: '/ehs/waterFoodieCategory/list',
        method: 'get',
        params: query
    })
}

// 查询水耗设备分类详细
export function getWaterFoodieCategory(id) {
    return request({
        url: '/ehs/waterFoodieCategory/' + id,
        method: 'get'
    })
}

// 新增水耗设备分类
export function addWaterFoodieCategory(data) {
    return request({
        url: '/ehs/waterFoodieCategory',
        method: 'post',
        data: data
    })
}

// 修改水耗设备分类
export function updateWaterFoodieCategory(data) {
    return request({
        url: '/ehs/waterFoodieCategory',
        method: 'put',
        data: data
    })
}

// 删除水耗设备分类
export function delWaterFoodieCategory(id) {
    return request({
        url: '/ehs/waterFoodieCategory/' + id,
        method: 'delete'
    })
}



