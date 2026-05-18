import request from '@/utils/request'

// 查询物料计算列表
export function listMaterialComputing(query) {
    return request({
        url: '/pln/materialComputing/list',
        method: 'get',
        params: query
    })
}

// 查询物料计算详细
export function getMaterialComputing(id) {
    return request({
        url: '/pln/materialComputing/' + id,
        method: 'get'
    })
}

// 新增物料计算
export function addMaterialComputing(data) {
    return request({
        url: '/pln/materialComputing',
        method: 'post',
        data: data
    })
}

// 修改物料计算
export function updateMaterialComputing(data) {
    return request({
        url: '/pln/materialComputing',
        method: 'put',
        data: data
    })
}

// 删除物料计算
export function delMaterialComputing(id) {
    return request({
        url: '/pln/materialComputing/' + id,
        method: 'delete'
    })
}

// 算料
export function runMrp(id)  {
    return request({
        url: '/pln/materialComputing/runMrp/'+ id,
        method: 'put'
    })
}



// 订单号
export function getNextBillno(billCode) {
    return request({
        url: '/tool/billManager/' + billCode,
        method: 'get'
    })
}

export function updateBillSeq(billCode) {
    return request({
        url: '/tool/billManager/' + billCode,
        method: 'put'
    })
}

