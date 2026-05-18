import request from '@/utils/request'

// 查询气耗登记列表
export function listGasConsuming(query) {
    return request({
        url: '/ehs/gasConsuming/list',
        method: 'get',
        params: query
    })
}

// 查询气耗登记详细
export function getGasConsuming(id) {
    return request({
        url: '/ehs/gasConsuming/' + id,
        method: 'get'
    })
}

// 新增气耗登记
export function addGasConsuming(data) {
    return request({
        url: '/ehs/gasConsuming',
        method: 'post',
        data: data
    })
}

// 修改气耗登记
export function updateGasConsuming(data) {
    return request({
        url: '/ehs/gasConsuming',
        method: 'put',
        data: data
    })
}

// 删除气耗登记
export function delGasConsuming(id) {
    return request({
        url: '/ehs/gasConsuming/' + id,
        method: 'delete'
    })
}



