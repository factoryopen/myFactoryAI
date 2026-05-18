import request from '@/utils/request'

// 查询气耗设备列表
export function listGasFoodie(query) {
    return request({
        url: '/ehs/gasFoodie/list',
        method: 'get',
        params: query
    })
}

// 查询气耗设备详细
export function getGasFoodie(id) {
    return request({
        url: '/ehs/gasFoodie/' + id,
        method: 'get'
    })
}

// 新增气耗设备
export function addGasFoodie(data) {
    return request({
        url: '/ehs/gasFoodie',
        method: 'post',
        data: data
    })
}

// 修改气耗设备
export function updateGasFoodie(data) {
    return request({
        url: '/ehs/gasFoodie',
        method: 'put',
        data: data
    })
}

// 删除气耗设备
export function delGasFoodie(id) {
    return request({
        url: '/ehs/gasFoodie/' + id,
        method: 'delete'
    })
}



