import request from '@/utils/request'

// 查询水耗设备列表
export function listWaterFoodie(query) {
    return request({
        url: '/ehs/waterFoodie/list',
        method: 'get',
        params: query
    })
}

// 查询水耗设备详细
export function getWaterFoodie(id) {
    return request({
        url: '/ehs/waterFoodie/' + id,
        method: 'get'
    })
}

// 新增水耗设备
export function addWaterFoodie(data) {
    return request({
        url: '/ehs/waterFoodie',
        method: 'post',
        data: data
    })
}

// 修改水耗设备
export function updateWaterFoodie(data) {
    return request({
        url: '/ehs/waterFoodie',
        method: 'put',
        data: data
    })
}

// 删除水耗设备
export function delWaterFoodie(id) {
    return request({
        url: '/ehs/waterFoodie/' + id,
        method: 'delete'
    })
}



