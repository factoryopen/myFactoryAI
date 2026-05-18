import request from '@/utils/request'

// 查询交货方式列表
export function listShipmentType(query) {
    return request({
        url: '/bas/shipmentType/list',
        method: 'get',
        params: query
    })
}

// 查询交货方式详细
export function getShipmentType(id) {
    return request({
        url: '/bas/shipmentType/' + id,
        method: 'get'
    })
}

// 新增交货方式
export function addShipmentType(data) {
    return request({
        url: '/bas/shipmentType',
        method: 'post',
        data: data
    })
}

// 修改交货方式
export function updateShipmentType(data) {
    return request({
        url: '/bas/shipmentType',
        method: 'put',
        data: data
    })
}

// 删除交货方式
export function delShipmentType(id) {
    return request({
        url: '/bas/shipmentType/' + id,
        method: 'delete'
    })
}



