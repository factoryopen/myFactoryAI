import request from '@/utils/request'

// 查询电耗登记列表
export function listPowerConsuming(query) {
    return request({
        url: '/ehs/powerConsuming/list',
        method: 'get',
        params: query
    })
}

// 查询电耗登记详细
export function getPowerConsuming(id) {
    return request({
        url: '/ehs/powerConsuming/' + id,
        method: 'get'
    })
}

// 新增电耗登记
export function addPowerConsuming(data) {
    return request({
        url: '/ehs/powerConsuming',
        method: 'post',
        data: data
    })
}

// 修改电耗登记
export function updatePowerConsuming(data) {
    return request({
        url: '/ehs/powerConsuming',
        method: 'put',
        data: data
    })
}

// 删除电耗登记
export function delPowerConsuming(id) {
    return request({
        url: '/ehs/powerConsuming/' + id,
        method: 'delete'
    })
}



