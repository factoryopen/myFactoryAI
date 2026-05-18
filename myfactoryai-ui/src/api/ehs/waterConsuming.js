import request from '@/utils/request'

// 查询水耗登记列表
export function listWaterConsuming(query) {
    return request({
        url: '/ehs/waterConsuming/list',
        method: 'get',
        params: query
    })
}

// 查询水耗登记详细
export function getWaterConsuming(id) {
    return request({
        url: '/ehs/waterConsuming/' + id,
        method: 'get'
    })
}

// 新增水耗登记
export function addWaterConsuming(data) {
    return request({
        url: '/ehs/waterConsuming',
        method: 'post',
        data: data
    })
}

// 修改水耗登记
export function updateWaterConsuming(data) {
    return request({
        url: '/ehs/waterConsuming',
        method: 'put',
        data: data
    })
}

// 删除水耗登记
export function delWaterConsuming(id) {
    return request({
        url: '/ehs/waterConsuming/' + id,
        method: 'delete'
    })
}



