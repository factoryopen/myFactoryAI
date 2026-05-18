import request from '@/utils/request'

// 查询电耗设备列表
export function listPowerFoodie(query) {
    return request({
        url: '/ehs/powerFoodie/list',
        method: 'get',
        params: query
    })
}

// 查询电耗设备详细
export function getPowerFoodie(id) {
    return request({
        url: '/ehs/powerFoodie/' + id,
        method: 'get'
    })
}

// 新增电耗设备
export function addPowerFoodie(data) {
    return request({
        url: '/ehs/powerFoodie',
        method: 'post',
        data: data
    })
}

// 修改电耗设备
export function updatePowerFoodie(data) {
    return request({
        url: '/ehs/powerFoodie',
        method: 'put',
        data: data
    })
}

// 删除电耗设备
export function delPowerFoodie(id) {
    return request({
        url: '/ehs/powerFoodie/' + id,
        method: 'delete'
    })
}



