import request from '@/utils/request'

// 查询出入库请求列表
export function listStockRequest(query) {
    return request({
        url: '/snc/stockRequest/list',
        method: 'get',
        params: query
    })
}

// 查询出入库请求列表
export function listStockRequestPMaterial(query) {
  return request({
    url: '/snc/stockRequest/list',
    method: 'get',
    params: query
  })
}

// 查询仓库存货流水列表
export function listStockRequestFinished(query) {
  return request({
    url: '/snc/stockRequest/listFinished',
    method: 'get',
    params: query
  })
}

// 查询出入库请求详细
export function getStockRequest(id) {
    return request({
        url: '/snc/stockRequest/' + id,
        method: 'get'
    })
}

// 新增出入库请求
export function addStockRequest(data) {
    return request({
        url: '/snc/stockRequest',
        method: 'post',
        data: data
    })
}

// 修改出入库请求
export function updateStockRequest(data) {
    return request({
        url: '/snc/stockRequest',
        method: 'put',
        data: data
    })
}

// 删除出入库请求
export function delStockRequest(id) {
    return request({
        url: '/snc/stockRequest/' + id,
        method: 'delete'
    })
}

// 启用
export function enable(id)  {
    return request({
        url: '/snc/stockRequest/enable/'+ id,
        method: 'put'
    })
}
// 请库
export function requestStock(ids)  {
    return request({
        url: '/snc/stockRequest/requestStock/'+ id,
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

